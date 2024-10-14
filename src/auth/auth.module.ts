import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { WebsocketGateway } from '../web-sokert/web.soket';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Замените 'yourSecretKey' на реальный секретный ключ
      signOptions: { expiresIn: '1h' }, // Настройка срока действия токена
    }),
  ],
  providers: [AuthService, PrismaService, WebsocketGateway],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
