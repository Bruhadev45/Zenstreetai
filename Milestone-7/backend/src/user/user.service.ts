import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(username: string, password: string) {
    try {
      const existingUser = await this.userModel.findOne({ username }).exec();
      if (existingUser) {
        throw new BadRequestException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        username,
        password: hashedPassword,
        tree: { value: 1, children: [] },
      });
      return user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error registering user: ${error.message}`,
      );
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error validating user: ${error.message}`,
      );
    }
  }
}
