import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  imports: [UserModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
