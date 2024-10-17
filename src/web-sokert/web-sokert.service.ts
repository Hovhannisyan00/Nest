import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WebSokertService {
  constructor(private jwtServic: JwtService) {}
  async getUserByToken(token: string) {
    console.log(token, 'wwwwwwww');
    try {
      const payload = await this.jwtServic.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      console.log(payload, 808080808088);
    } catch (e) {
      console.log('Token validation error:', e.message);
      return e.message;
    }

    // return this.prisma.user.findUnique({
    //   where: { id: payload.sub },
    // });
  }
}
