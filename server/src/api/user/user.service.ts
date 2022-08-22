import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, Environment, UpsertCatalogObjectRequest } from 'square';
import { CreateUserDto, Rooms, SquareRooms } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  squareClient: Client;
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private http: HttpService,
  ) {}

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
    if (updateUserDto.domain) {
      console.log(process.env.GIT_API_REF);
      const listGitRef = await this.http
        .get(process.env.GIT_API_REF, {
          auth: {
            username: process.env.GH_UNAME,
            password: process.env.GH_PAT,
          },
        })
        .toPromise();
      const mainRef = listGitRef.data.find(
        (element: any) => element.ref == 'refs/heads/main',
      );
      console.log(mainRef);
      console.log(mainRef.ref);
      console.log(mainRef.object.sha);
      try {
        const createBranch = await this.http
          .post(
            process.env.GIT_API_POST_REF,
            {
              ref: `refs/heads/${updateUserDto.domain}`,
              sha: mainRef.object.sha,
            },
            {
              auth: {
                username: process.env.GH_UNAME,
                password: process.env.GH_PAT,
              },
            },
          )
          .toPromise();
        console.log(createBranch);
      } catch (error) {
        console.log(error);
      }
    }
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
      environment: Environment.Sandbox,
    });
    const locationId = 'LE71ZKQP21GYA';
    const teamMemberId = 'a6fze0j0ecfco4';
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
                  amount: BigInt(rooms.roomPrice),
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

  async findAvailability(start: string, end: string, hotel: string) {
    const users = await this.findAll();
    const user = users.find((user) => (user.hotelName = hotel));

    const squareClient = new Client({
      accessToken: user.square.accessToken,
      environment: Environment.Sandbox,
    });

    try {
      const data = await squareClient.bookingsApi.searchAvailability({
        query: {
          filter: {
            locationId: 'LE71ZKQP21GYA',
            startAtRange: {
              startAt: start,
              endAt: end,
            },
            segmentFilters: [
              {
                serviceVariationId: 'ODUK56NBKRMHJOSTU74EBSYX',
              },
            ],
          },
        },
      });
      return data.body;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(name: string) {
    const users = await this.findAll();
    const user = users.find((user) => (user.hotelName = 'test-2'));

    const squareClient = new Client({
      accessToken: user.square.accessToken,
      environment: Environment.Sandbox,
    });

    const res = await squareClient.customersApi.createCustomer({
      givenName: name,
    });
    return res.result.customer.id;
  }

  async createBooking(name: string) {
    const users = await this.findAll();
    const user = users.find((user) => (user.hotelName = 'test-2'));

    const squareClient = new Client({
      accessToken: user.square.accessToken,
      environment: Environment.Sandbox,
    });

    const userId = this.createUser(name);
    console.log(userId);

    try {
      const data = await squareClient.bookingsApi.createBooking({
        booking: {
          customerId: 'AG31MWV1XM4F0HAZFHX787AGQ4',
          locationId: 'LE71ZKQP21GYA',
          appointmentSegments: [
            {
              teamMemberId: 'TM_HAmTYFBJM4iU0',
              durationMinutes: 1320,
              serviceVariationId: 'ODUK56NBKRMHJOSTU74EBSYX',
              serviceVariationVersion: BigInt(1661170711778),
            },
          ],
          startAt: '2022-08-26T20:00:00Z',
        },
        idempotencyKey: uuidv4(),
      });
      return data.body;
    } catch (error) {
      console.log(error);
    }
  }
}
