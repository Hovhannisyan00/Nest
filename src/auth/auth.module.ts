import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../moduls/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { WebsocketGateway } from '../web-sokert/web.soket';
import { SocketAdapter } from '../web-sokert/soket-io.adapter';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    SocketAdapter,
  ],
  providers: [AuthService, PrismaService, WebsocketGateway, SocketAdapter],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
