export interface User {
  _id: string;
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
