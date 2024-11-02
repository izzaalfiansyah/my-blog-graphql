import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

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
  coverImage?: string;

  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;
}
