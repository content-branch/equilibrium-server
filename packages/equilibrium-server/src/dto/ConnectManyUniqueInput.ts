import { Field, InputType } from '@nestjs/graphql';
import { WhereUniqueInput } from './WhereUniqueInput';

@InputType({
  isAbstract: true,
  description: undefined
})
export class ConnectManyUniqueInput {
  @Field(() => [WhereUniqueInput], {
    nullable: false
  })
  connect: WhereUniqueInput[];
}
