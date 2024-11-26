import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CollaborationService } from './collaboration.service';

@WebSocketGateway({ cors: true })
export class CollaborationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly collaborationService: CollaborationService) {}

  @SubscribeMessage('joinDocument')
  async handleJoin(@MessageBody() docId: string, @ConnectedSocket() client: Socket): Promise<void> {
    client.join(docId);
  
    const documentContent = await this.collaborationService.getDocument(docId);
  
    console.log('Sending document content:', documentContent);
  
    client.emit('documentContent', documentContent);
  }
  

  @SubscribeMessage('updateDocument')
  handleUpdate(
    @MessageBody() { docId, content }: { docId: string; content: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.collaborationService.updateDocument(docId, content);
    this.server.to(docId).emit('documentUpdated', content);
  }
}
