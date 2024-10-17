import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usersequeliza } from './model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Usersequeliza])],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
