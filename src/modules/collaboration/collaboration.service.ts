import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollaborationDocument } from './schemas/document.schema';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectModel(CollaborationDocument.name) 
    private readonly documentModel: Model<CollaborationDocument>,
  ) {}

  async getDocument(docId: string): Promise<string> {
    const doc = await this.documentModel.findOne({ docId }).exec();
  
    if (!doc) {
      const newDoc = new this.documentModel({ docId, content: '' });
      await newDoc.save();
      return '';
    }
  
    return doc.content;
  }
  
  

  async updateDocument(docId: string, content: string): Promise<void> {
    await this.documentModel.updateOne(
      { docId },
      { $set: { content } },
      { upsert: true },
    ).exec();
  }
}
