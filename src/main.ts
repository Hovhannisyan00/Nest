import { NestFactory } from '@nestjs/core';
import { AppModule } from './moduls/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SERVER_CONFIG } from './configuration/server.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SocketAdapter } from './web-sokert/soket-io.adapter';
import { WebSokertController } from './web-sokert/web-sokert.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const webSokertController = app.get(WebSokertController);
  app.useWebSocketAdapter(new SocketAdapter(webSokertController));
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('My API Documentation')
    .setDescription('My very good API Documentation')
    .setVersion('1.0.0')
    .addTag('API')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://example.com/auth',
          tokenUrl: 'https://example.com/token',
          scopes: {
            'read:items': 'Read items',
            'write:items': 'Write items',
          },
        },
      },
    })
    .build();
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(SERVER_CONFIG.APP_PORT);
  console.log(
    `Server is running on http://localhost:${SERVER_CONFIG.APP_PORT}`,
  );
}
bootstrap();
