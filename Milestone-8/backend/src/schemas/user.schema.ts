import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TreeNode, TreeNodeSchema } from './tree.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ type: TreeNodeSchema, required: true })
  tree: TreeNode;
}

export const UserSchema = SchemaFactory.createForClass(User);
