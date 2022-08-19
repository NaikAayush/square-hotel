import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  email: string;

  photoURL?: string;
  displayName?: string;

  square?: Square;
}

export interface Square {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  merchantId?: string;
}
