import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tree extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, type: Object })
  tree: Record<string, any>;
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
