import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  _id: string;
  @IsNotEmpty()
  email: string;
  photoURL?: string;
  displayName?: string;
  square?: Square;
  hotelName?: string;
  domain?: string;
  rooms?: Array<Rooms>;
  cookieToken?: string;
  locationId?: string;
  teamArray?: string[];
}

export interface Square {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  merchantId?: string;
}

export interface Rooms {
  id?: string;
  itemId?: string;
  roomName?: string;
  roomUnits?: number;
  roomSize?: number;
  bedType?: string;
  bedUnits?: number;
  roomCoverPhoto?: string;
  roomDescription?: string;
  roomPrice?: number;
}

export interface SquareRooms {
  id: string;
  itemData: {
    description: string;
    name: string;
    productType: string;
    variations: [
      {
        id: string;
        itemVariationData: {
          availableForBooking: boolean;
          inventoryAlertType: string;
          name: string;
          priceMoney: {
            amount: number;
            currency: string;
          };
          pricingType: string;
          serviceDuration: number;
        };
        presentAtAllLocations: boolean;
        type: string;
        teamMemberIds: Array<string>;
        presentAtLocationIds: string;
      },
    ];
  };
  presentAtAllLocations: boolean;
  type: string;
}
