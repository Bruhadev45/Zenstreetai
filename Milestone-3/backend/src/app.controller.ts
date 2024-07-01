import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Post('register')
  async register(@Body('username') username: string) {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const user = new this.userModel({ username, tree: {} });
    await user.save();
    return user;
  }
}
