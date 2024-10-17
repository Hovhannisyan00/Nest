import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebSokertController } from '../../web-sokert/web-sokert.controller';
import { WebSokertModule } from '../../web-sokert/web-sokert.module';
// import { SoketModule } from '../soket/soket.module';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
// import { AuthModule } from "../auth/auth.module";
// https://youtu.be/SJlmYRZmgXY?si=601lkxW7d9r45EzI
@Module({
  imports: [
    WebSokertModule,
    ConfigModule,
    AuthModule,
    UsersModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        dialect: 'postgres',
        host: ConfigService.get('db_host'),
        port: ConfigService.get('db_port'),
        username: ConfigService.get('db_name'),
        password: ConfigService.get('db_password'),
        database: ConfigService.get('db_user'),
        synchronize: true,
        autoLoadModels: true,
        models: [],
      }),
    }),
  ],

  controllers: [WebSokertController],
  providers: [WebSokertController],
})
export class AppModule {}
