import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
// import { SoketModule } from '../soket/soket.module';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
// import { AuthModule } from "../auth/auth.module";
// https://youtu.be/SJlmYRZmgXY?si=601lkxW7d9r45EzI
@Module({
  imports: [
    AuthModule,
    UsersModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   driver: ApolloDriver,
    //   sortSchema: true,
    // }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
