import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
