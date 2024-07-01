import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeController } from './tree.controller';
import { Tree, TreeSchema } from './tree.schema';
import { TreeService } from './tree.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tree.name, schema: TreeSchema }]),
  ],
  controllers: [TreeController],
  providers: [TreeService],
})
export class TreeModule {}
