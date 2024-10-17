import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';
import { WebSokertController } from './web-sokert.controller';

export interface SocketIo extends Socket {
  user?: {
    id: number;
  };
}

export class SocketAdapter extends IoAdapter {
  constructor(private webSokertController: WebSokertController) {
    super();
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: true,
      maxHttpBufferSize: 1e8,
    });

    // Middleware to validate token and attach user info to socket
    server.use(async (socket: SocketIo, next) => {
      let token = socket.handshake.headers.token;

      if (!token) {
        console.log('No token provided');
        return next(new Error('Unauthorized'));
      }

      // Ensure token is a string
      if (Array.isArray(token)) {
        token = token[0]; // Take the first token if it's an array
      }

      // try {
      // Now the token is guaranteed to be a string
      const user = await this.webSokertController.getUserByToken(token);
      console.log(user, 7777);

      next();
      // } catch (error) {
      //   console.log('Token validation error:', error.message);
      //   return next(new Error('Unauthorized'));
      // }
    });

    return server;
  }
}
