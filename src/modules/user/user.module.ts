import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your actual secret
      signOptions: { expiresIn: '1h' }, // Optional: Token expiration
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, JwtModule],
})

export class UserModule {}
