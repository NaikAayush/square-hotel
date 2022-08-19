export interface User {
  _id: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  square?: Square;
  hotelName?: string;
  domain?: string;
}

export interface Square {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  merchantId?: string;
}
