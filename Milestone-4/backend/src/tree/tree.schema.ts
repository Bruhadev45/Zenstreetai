import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tree extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Object, default: { value: 1, children: [] } })
  structure: any;
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
