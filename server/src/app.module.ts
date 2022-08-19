import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './api/rooms/rooms.module';
import { OauthController } from './api/oauth/oauth.controller';
import { OauthModule } from './api/oauth/oauth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    RoomsModule,
    OauthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
