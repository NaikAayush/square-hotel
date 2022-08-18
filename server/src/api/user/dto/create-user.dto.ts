import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  email: string;

  photoURL?: string;
  displayName?: string;
}
