import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto, Rooms } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') uid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.update(uid, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/rooms/:id')
  async handleRoom(
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
