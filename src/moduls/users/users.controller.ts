import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    const cokies = request;
    return this.usersService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') id: string) {
    return this.usersService.findOne(id);
  }
}
