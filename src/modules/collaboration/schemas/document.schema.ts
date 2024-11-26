import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CollaborationDocument extends Document {
  @Prop({ required: true })
  docId: string;

  @Prop({ required: true, default: '' })
  content: string;
}

export const CollaborationDocumentSchema = SchemaFactory.createForClass(CollaborationDocument);
