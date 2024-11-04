import { IsBoolean, IsUrl, MaxLength } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
export class PostInput {
  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  @MaxLength(255)
  description: string;

  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field({ nullable: true })
  emoji?: string;

  @IsUrl()
  @Field({ nullable: true })
  coverImageUrl?: string;

  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;

  @MaxLength(20)
  @Field({ nullable: true })
  createdPlace: string;
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
