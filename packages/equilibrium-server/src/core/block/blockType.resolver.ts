import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBlock } from 'src/models';
import { FindOneWithVersionArgs } from 'src/dto';
import { AuthorizeContext } from 'src/decorators/authorizeContext.decorator';
import { AuthorizableResourceParameter } from 'src/enums/AuthorizableResourceParameter';
import { BlockTypeService } from './blockType.service';
import {
  FindManyBlockArgs,
  CreateBlockArgs,
  UpdateBlockArgs
} from './dto';

type Constructor<T> = {
  new (...args: any): T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function BlockTypeResolver<
  T extends IBlock,
  FindManyArgs extends FindManyBlockArgs,
  CreateArgs extends CreateBlockArgs,
  UpdateArgs extends UpdateBlockArgs
>(
  classRef: Constructor<T>,
  findManyName: string,
  findManyArgsRef: Constructor<FindManyArgs>,
  createName: string,
  createArgsRef: Constructor<CreateArgs>,
  updateName: string,
  updateArgsRef: Constructor<UpdateArgs>
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    abstract service: BlockTypeService<T, FindManyArgs, CreateArgs, UpdateArgs>;

    @Query(() => classRef, {
      name: classRef.name,
      nullable: true,
      description: undefined
    })
    @AuthorizeContext(AuthorizableResourceParameter.BlockId, 'where.id')
    async findOne(@Args() args: FindOneWithVersionArgs): Promise<T | null> {
      return this.service.findOne(args);
    }

    @Query(() => [classRef], {
      name: findManyName,
      nullable: false,
      description: undefined
    })
    @AuthorizeContext(AuthorizableResourceParameter.AppId, 'where.app.id')
    async findMany(
      @Args({ type: () => findManyArgsRef }) args: FindManyArgs
    ): Promise<T[]> {
      return this.service.findMany(args);
    }

    @Mutation(() => classRef, {
      name: createName,
      nullable: false,
      description: undefined
    })
    @AuthorizeContext(
      AuthorizableResourceParameter.AppId,
      'data.app.connect.id'
    )
    async [createName](
      @Args({ type: () => createArgsRef }) args: CreateArgs
    ): Promise<T> {
      return this.service.create(args);
    }

    @Mutation(() => classRef, {
      name: updateName,
      nullable: false,
      description: undefined
    })
    @AuthorizeContext(AuthorizableResourceParameter.BlockId, 'where.id')
    async [updateName](
      @Args({ type: () => updateArgsRef }) args: UpdateArgs
    ): Promise<T> {
      return this.service.update(args);
    }
  }
  return BaseResolverHost;
}
