import { Field, InputType } from '@nestjs/graphql';
import { WhereParentIdInput } from 'src/dto';

@InputType({
  isAbstract: true
})
export class CommitCreateInput {
  @Field(() => String, {
    nullable: false
  })
  message!: string;

  @Field(() => WhereParentIdInput, {
    nullable: false,
    description: undefined
  })
  app!: WhereParentIdInput;

  /**do not expose to GraphQL - This field should be injected from context  */
  user!: WhereParentIdInput;
}
