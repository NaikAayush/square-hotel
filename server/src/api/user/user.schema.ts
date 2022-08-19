import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Square } from './dto/create-user.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  photoURL: string;

  @Prop()
  displayName: string;

  @Prop({ type: Object })
  square: Square;

  @Prop()
  hotelName: string;

  @Prop()
  domain: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
