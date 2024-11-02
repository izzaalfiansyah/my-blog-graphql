import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  about: string;
}
