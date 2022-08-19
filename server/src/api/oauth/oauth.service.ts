import { Injectable } from '@nestjs/common';
import { Client, Environment, OAuthApi } from 'square';
import { UserService } from '../user/user.service';

@Injectable()
export class OauthService {
  basePath: string;
  environment: Environment;
  oauthInstance: OAuthApi;

  constructor(private userService: UserService) {
    if (process.env.SQ_ENVIRONMENT.toLowerCase() === 'production') {
      this.basePath = `https://connect.squareup.com`;
      this.environment = Environment.Production;
    } else if (process.env.SQ_ENVIRONMENT.toLowerCase() === 'sandbox') {
      this.basePath = `https://connect.squareupsandbox.com`;
      this.environment = Environment.Sandbox;
    } else {
      console.warn('Unsupported value for SQ_ENVIRONMENT in .env file.');
      process.exit(1);
    }

    const squareClient = new Client({
      environment: this.environment,
    });
    this.oauthInstance = squareClient.oAuthApi;
  }

  async callback(uid: string, code: string) {
    let { result } = await this.oauthInstance.obtainToken({
      code,
      clientId: process.env.SQ_APPLICATION_ID,
      clientSecret: process.env.SQ_APPLICATION_SECRET,
      grantType: 'authorization_code',
    });

    let { accessToken, refreshToken, expiresAt, merchantId } = result;

    return await this.userService.update(uid, {
      square: {
        accessToken,
        refreshToken,
        expiresAt,
        merchantId,
      },
    });
  }
}
