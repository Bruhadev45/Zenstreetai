import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  tree: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
