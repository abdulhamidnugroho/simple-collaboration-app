import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaborationGateway } from './collaboration.gateway';
import { CollaborationService } from './collaboration.service';
import { CollaborationDocument, CollaborationDocumentSchema } from './schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CollaborationDocument.name, schema: CollaborationDocumentSchema },
    ]),
  ],
  providers: [CollaborationGateway, CollaborationService],
})
export class CollaborationModule {}
