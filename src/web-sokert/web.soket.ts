import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  afterInit(server: Server): void {
    console.log('WebSocket server initialized', server);
  }
  handleConnection(client: Socket): void {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket): void {
    console.log('Client disconnected:', client.id);
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: string, client: Socket): void {
  //   const header = client?.handshake?.headers;
  //   console.log('Client headers:', header);
  //   console.log('Message received:', message);
  //   // console.log();
  //   // this.server.emit('message', `Echo: ${message}`);
  // }

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number) {
    console.log('handleEventttttttttttttt');
    // id === messageBody.id
    console.log(id);
  }
}
