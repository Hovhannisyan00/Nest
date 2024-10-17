import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 3);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}

// findOne(name: string) {
//   return this.prisma.user.findUnique({
//     where: { name: name }, // Здесь нужно указать поле "where"
//   });
// }
//
// update(id: number, updateUserDto: UpdateUserDto) {
//   return `This action updates a #${id} user`;
// }
//
// remove(id: number) {
//   return `This action removes a #${id} user`;
// }
