import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeNode } from '../schemas/tree.schema';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(TreeNode.name) private treeNodeModel: Model<TreeNode>,
  ) {}

  async createUser(username: string): Promise<User> {
    const tree = await this.generateTree(4); // Adjust depth as needed
    const createdUser = new this.userModel({ username, tree });
    return createdUser.save();
  }

  async findUser(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async updateUserTree(username: string, tree: TreeNode): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ username }, { tree }, { new: true })
      .exec();
  }

  private async generateTree(depth: number): Promise<TreeNode> {
    if (depth <= 0) {
      return new this.treeNodeModel({ value: 1, children: [] }).save();
    }

    const children = await Promise.all(
      Array.from({ length: 10 }, () => this.generateTree(depth - 1)),
    );
    return new this.treeNodeModel({ value: 1, children }).save();
  }
}
