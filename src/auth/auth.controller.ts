import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() Res: Response) {
    const { email, password } = signInDto;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    try {
      const result = await this.authService.signIn(email, password);
      if (!result) {
        throw new BadRequestException('Invalid credentials');
      }
      const token = result.access_token;
      Res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
      });

      const added = this.authService.addToken(email, token);
      if (!added) {
        throw new BadRequestException('Failed to add token to database');
      }

      return Res.send(result);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
