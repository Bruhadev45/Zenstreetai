import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TreeNode } from '../schemas/tree.schema';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body('username') username: string): Promise<User> {
    return this.usersService.createUser(username);
  }

  @Get(':username')
  async findUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findUser(username);
  }

  @Put(':username/tree')
  async updateUserTree(
    @Param('username') username: string,
    @Body('tree') tree: TreeNode,
  ): Promise<User> {
    return this.usersService.updateUserTree(username, tree);
  }
}
