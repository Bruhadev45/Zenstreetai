import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TreeNode extends Document {
  @Prop({ required: true })
  value: number;

  @Prop({
    type: [{ type: SchemaFactory.createForClass(TreeNode) }],
    default: [],
  })
  children: TreeNode[];
}

export const TreeNodeSchema = SchemaFactory.createForClass(TreeNode);
