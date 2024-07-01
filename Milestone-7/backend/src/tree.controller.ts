import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { TreeService } from './tree.service';

@Controller('trees')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post(':username')
  async saveTree(
    @Param('username') username: string,
    @Body() createTreeDto: CreateTreeDto,
  ) {
    return this.treeService.saveTree(
      createTreeDto.username,
      createTreeDto.tree,
    );
  }

  @Get(':username')
  async getTree(@Param('username') username: string) {
    return this.treeService.getTree(username);
  }
}
