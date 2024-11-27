import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key', // Replace with a secure key
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
