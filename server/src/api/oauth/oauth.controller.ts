import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CallbackDto } from './dto/callback.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private oauthService: OauthService) {}
  @Get('request_token')
  requestToken(): string {
    return 'This action returns all cats';
  }

  @Post('callback/:id')
  async callback(
    @Res() response,
    @Body() callbackDto: CallbackDto,
    @Param('id') uid: string,
  ) {
    try {
      const user = await this.oauthService.callback(uid, callbackDto.code);
      return response.status(HttpStatus.OK).json({
        message: 'Oauth complete',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
