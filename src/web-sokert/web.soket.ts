import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@WebSocketGateway(4800, { cors: { origin: '*', methods: ['GET', 'POST'] } })
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('ChatGateway');
  constructor(private readonly jwtService: JwtService) {}
  afterInit(server: Server): void {
    console.log('WebSocket server initialized', server);
  }
  handleConnection(client: Socket): void {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket): void {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  async onMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = client.handshake.headers.name;
    console.log(`${user} : ${message}`);

    this.server.emit('message', `${user} : ${message}`);
  }
}
