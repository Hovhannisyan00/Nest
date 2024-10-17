import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../moduls/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (!user || user.email !== email) {
      throw new UnauthorizedException('User not found or invalid email');
    }

    const isPasswordValid = bcrypt.compareSync(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.email };

    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async addToken(email: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    await this.prisma.user.update({
      where: { email: email },
      data: { confirmationToken: token },
    });
    console.log(`Adding token to database: ${token}`);
  }
}
