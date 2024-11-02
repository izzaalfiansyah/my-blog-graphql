import { MaxLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
export class PostInput {
  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field({ nullable: true })
  emoji?: string;

  @Field({ nullable: true })
  coverImageUrl?: string;

  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;
}

@ArgsType()
export class PostsArgs {
  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;

  @Field(() => Number, { nullable: true })
  limit: number;

  @Field(() => Number, { nullable: true })
  page: number;
}
