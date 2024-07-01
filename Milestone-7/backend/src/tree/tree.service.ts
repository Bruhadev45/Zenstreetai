import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tree } from './tree.schema';

@Injectable()
export class TreeService {
  constructor(@InjectModel(Tree.name) private treeModel: Model<Tree>) {}

  async saveTree(
    username: string,
    treeData: Record<string, any>,
  ): Promise<Tree> {
    const existingTree = await this.treeModel.findOne({ username });
    if (existingTree) {
      existingTree.tree = treeData;
      return existingTree.save();
    } else {
      const newTree = new this.treeModel({ username, tree: treeData });
      return newTree.save();
    }
  }

  async getTree(username: string): Promise<Tree> {
    const tree = await this.treeModel.findOne({ username });
    if (!tree) {
      throw new NotFoundException(`Tree for username ${username} not found`);
    }
    return tree;
  }
}
