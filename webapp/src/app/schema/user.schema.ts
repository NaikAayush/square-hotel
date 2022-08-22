export interface User {
  _id: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  square?: Square;
  hotelName?: string;
  domain?: string;
  rooms?: Array<Rooms>;
}

export interface Square {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  merchantId?: string;
}

export interface Rooms {
  roomName?: string;
  roomUnits?: number;
  roomSize?: number;
  bedType?: string;
  bedUnits?: number;
  roomCoverPhoto?: string;
  roomDescription?: string;
}
