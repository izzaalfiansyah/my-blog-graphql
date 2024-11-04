import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  emoji: string;

  @Field()
  slug: string;

  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  coverImageUrl?: string;

  @Field(() => Boolean)
  isPublished: boolean;

  @Field()
  createdPlace: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
