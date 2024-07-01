import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tree } from './tree.schema';

@Injectable()
export class TreeService {
  constructor(@InjectModel(Tree.name) private treeModel: Model<Tree>) {}

  async saveTree(userId: string, structure: any) {
    const existingTree = await this.treeModel.findOne({ userId }).exec();
    if (existingTree) {
      existingTree.structure = structure;
      return existingTree.save();
    }
    const newTree = new this.treeModel({ userId, structure });
    return newTree.save();
  }

  async getTree(userId: string) {
    return this.treeModel.findOne({ userId }).exec();
  }
}
