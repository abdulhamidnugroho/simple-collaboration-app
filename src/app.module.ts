import { Module } from '@nestjs/common';
import { AppController, ProtectedController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaborationModule } from './modules/collaboration/collaboration.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/collaboration-app'),
    CollaborationModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, ProtectedController],
  providers: [AppService],
})
export class AppModule {}
