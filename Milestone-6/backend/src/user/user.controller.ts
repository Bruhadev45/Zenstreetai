import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    try {
      return this.userService.register(username, password);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error in registration: ${error.message}`,
      );
    }
  }

  @Post('validate')
  async validate(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    try {
      const user = await this.userService.validateUser(username, password);
      if (!user) {
        throw new BadRequestException('Invalid username or password');
      }

      return { message: 'User validated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error in validation: ${error.message}`,
      );
    }
  }
}
