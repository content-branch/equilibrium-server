import { Injectable, Inject } from '@nestjs/common';
import { FindOneWithVersionArgs } from 'src/dto';
import { IBlock } from 'src/models';
import { EnumBlockType } from 'src/enums/EnumBlockType';
import { BlockService } from './block.service';
import {
  CreateBlockArgs,
  FindManyBlockTypeArgs,
  UpdateBlockArgs
} from './dto';

@Injectable()
export abstract class BlockTypeService<
  T extends IBlock,
  FindManyArgs extends FindManyBlockTypeArgs,
  CreateArgs extends CreateBlockArgs,
  UpdateArgs extends UpdateBlockArgs
> {
  abstract blockType: EnumBlockType;

  @Inject()
  private readonly blockService: BlockService;

  async findOne(args: FindOneWithVersionArgs): Promise<T | null> {
    return this.blockService.findOne<T>(args);
  }

  async findMany(args: FindManyArgs): Promise<T[]> {
    return this.blockService.findManyByBlockType(args, this.blockType);
  }

  async create(args: CreateArgs): Promise<T> {
    return this.blockService.create<T>({
      ...args,
      data: {
        ...args.data,
        blockType: this.blockType
      }
    });
  }

  async update(args: UpdateArgs): Promise<T> {
    return this.blockService.update<T>({
      ...args
    });
  }
}
