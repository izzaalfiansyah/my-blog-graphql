import { Field, InputType } from "type-graphql";
import "class-validator";
import { IsEmail } from "class-validator";

@InputType()
export class AuthInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
