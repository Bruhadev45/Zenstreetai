import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeNode, TreeNodeSchema } from '../schemas/tree.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: TreeNode.name, schema: TreeNodeSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
