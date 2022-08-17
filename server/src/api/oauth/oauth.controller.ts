import { Controller, Get } from '@nestjs/common';

@Controller('oauth')
export class OauthController {
  @Get('request_token')
  requestToken(): string {
    return 'This action returns all cats';
  }

  @Get('callback')
  callback(): string {
    return 'This action returns all cats';
  }
}
