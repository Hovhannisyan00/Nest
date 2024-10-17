import { Controller } from '@nestjs/common';
import { WebSokertService } from './web-sokert.service';

@Controller('web-sokert')
export class WebSokertController {
  constructor(private readonly webSokertService: WebSokertService) {}
  getUserByToken(token: string) {
    return this.webSokertService.getUserByToken(token);
  }
}
