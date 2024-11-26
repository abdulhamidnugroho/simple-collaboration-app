import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaborationModule } from './modules/collaboration/collaboration.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/collaboration-app'),
    CollaborationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
