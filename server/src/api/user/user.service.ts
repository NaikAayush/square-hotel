import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, Environment, UpsertCatalogObjectRequest } from 'square';
import { CreateUserDto, Rooms, SquareRooms } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  squareClient: Client;
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.UserModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.UserModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  // async createSquareTeam(id: string){
  //   const user = await this.findOne(id);
  //   const squareClient = new Client({
  //     accessToken: user.square.accessToken,
  //     environment: Environment.Production,
  //   });
  //   squareClient.teamApi.
  // }

  async updateRoom(id: string, rooms: Rooms): Promise<User> {
    const user = await this.findOne(id);

    this.squareClient = new Client({
      accessToken: user.square.accessToken,
      environment: Environment.Production,
    });
    const locationId = 'LDHRT8GQP075P';
    const teamMemberId = 'TMnufxfypM6mRqG6';
    const squareRoom: UpsertCatalogObjectRequest = {
      idempotencyKey: uuidv4(),
      object: {
        id: '#room',
        type: 'ITEM',
        itemData: {
          availableElectronically: true,
          variations: [
            {
              itemVariationData: {
                availableForBooking: true,
                itemId: '#room',
                name: rooms.roomName,
                priceMoney: {
                  amount: BigInt(100),
                  currency: 'USD',
                },
                pricingType: 'FIXED_PRICING',
                sellable: true,
                serviceDuration: BigInt(79200000),
                inventoryAlertType: 'NONE',
                teamMemberIds: [teamMemberId],
              },
              id: '#something',
              presentAtAllLocations: true,
              type: 'ITEM_VARIATION',
              presentAtLocationIds: [locationId],
            },
          ],
          description: rooms.roomDescription,
          name: rooms.roomName,
          productType: 'APPOINTMENTS_SERVICE',
        },
        presentAtAllLocations: true,
      },
    };
    try {
      await this.squareClient.catalogApi.upsertCatalogObject(squareRoom);
    } catch (error) {
      console.log(error);
    }
    const existingUser = await this.UserModel.findByIdAndUpdate(
      id,
      { $push: { rooms: rooms } },
      { safe: true, upsert: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }
}
