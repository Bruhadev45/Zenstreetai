import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body('username') username: string) {
    return this.usersService.register(username);
  }
}
