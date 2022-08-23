import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiResponse,
  Location,
  SearchAvailabilityResponse,
  TeamMember,
} from 'square';
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

  @Get('/locations/:id')
  async getLocations(@Param('id') id: string): Promise<Location[]> {
    return await this.userService.getLocations(id);
  }

  @Get('/team/:id')
  async getTeamMembers(@Param('id') id: string): Promise<TeamMember[]> {
    return await this.userService.getTeamMembers(id);
  }

  @Put('/rooms/:id')
  async handleRoom(
    @Res() response,
    @Param('id') uid: string,
    @Body() rooms: Rooms,
  ) {
    const data = await this.userService.updateRoom(uid, rooms);
    return response.status(HttpStatus.OK).json(data);
  }

  @Delete('/rooms/:id/:roomItemId')
  async deleteRoom(
    @Res() response,
    @Param('id') uid: string,
    @Param('roomItemId') roomItemId: string,
    @Body() rooms: Rooms,
  ) {
    const data = await this.userService.deleteRoom(uid, roomItemId);
    return response.status(HttpStatus.OK).json(data);
  }

  @Get('/book/availability/:hotel/:start/:end')
  async findAvailability(
    @Res() response,
    @Param('start') hotel: string,
    @Param('start') start: string,
    @Param('end') end: string,
  ): Promise<ApiResponse<SearchAvailabilityResponse>> {
    const data = await this.userService.findAvailability(start, end, hotel);
    console.log(data);
    return response.status(HttpStatus.OK).json(data);
  }

  @Post('/book/')
  async book(@Res() response, @Param('id') uid: string, @Body() rooms: Rooms) {
    const existingUser = await this.userService.updateRoom(uid, rooms);
    return response.status(HttpStatus.OK).json({
      message: 'Room has been successfully created',
      existingUser,
    });
  }
}
