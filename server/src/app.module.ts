import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { RoomsModule } from './api/rooms/rooms.module';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { OauthController } from './api/oauth/oauth.controller';
import { OauthModule } from './api/oauth/oauth.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    RoomsModule,
    OauthModule,
  ],
  controllers: [AppController, OauthController],
  providers: [AppService],
})
export class AppModule {}
