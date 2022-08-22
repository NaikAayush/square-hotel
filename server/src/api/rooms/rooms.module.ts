import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [RoomsController],
})
export class RoomsModule {}
