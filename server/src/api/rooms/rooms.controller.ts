import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Rooms } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';

@Controller('rooms')
export class RoomsController {
  constructor(private userService: UserService) {}

  @Put('/:id')
  async create(
    @Res() response,
    @Param('id') uid: string,
    @Body() rooms: Rooms,
  ) {
    const existingUser = await this.userService.updateRoom(uid, rooms);
    return response.status(HttpStatus.OK).json({
      message: 'Room has been successfully created',
      existingUser,
    });
  }
}
