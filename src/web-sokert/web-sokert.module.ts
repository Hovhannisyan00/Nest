import { Module } from '@nestjs/common';
import { WebSokertService } from './web-sokert.service';
import { WebSokertController } from './web-sokert.controller';
import { SocketAdapter } from './soket-io.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SocketAdapter,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET, // Use your secret
      signOptions: { expiresIn: '120m' }, // Adjust expiration as needed
    }),
  ],
  controllers: [WebSokertController],
  providers: [WebSokertService, SocketAdapter],
  exports: [WebSokertService],
})
export class WebSokertModule {}
