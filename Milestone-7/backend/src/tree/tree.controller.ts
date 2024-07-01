import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TreeService } from './tree.service';

@Controller('trees')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post(':username')
  async saveTree(
    @Param('username') username: string,
    @Body('tree') treeData: Record<string, any>,
  ) {
    return this.treeService.saveTree(username, treeData);
  }

  @Get(':username')
  async getTree(@Param('username') username: string) {
    return this.treeService.getTree(username);
  }
}
