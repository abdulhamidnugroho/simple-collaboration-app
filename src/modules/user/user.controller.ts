import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists.');
    }

    const user = await this.userService.createUser(email, password);
    return { message: 'User created successfully.', userId: user._id };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);

    if (!user || !(await this.userService.validatePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
