import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TreeService } from './tree.service';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post('save')
  async saveTree(@Body() treeData: { userId: string; structure: any }) {
    return this.treeService.saveTree(treeData.userId, treeData.structure);
  }

  @Get(':userId')
  async getTree(@Param('userId') userId: string) {
    return this.treeService.getTree(userId);
  }
}
