import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AuthInput } from "./params/auth-params";
import { User } from "../entity/user";
import { userData } from "../data/user";
import { hash } from "bcrypt";
import { Context } from "../entity/context";

@Resolver()
export class AuthResolver {
  user: User;

  constructor() {
    this.user = userData;
  }

  @Mutation(() => String, { nullable: true })
  async login(@Arg("input") input: AuthInput): Promise<string> {
    if (input.email != this.user.email) {
      throw new Error("email salah");
    }

    if (input.password != this.user.password) {
      throw new Error("password salah");
    }

    const token = await hash(this.user.email, 10);

    return token;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: Context): Promise<User> {
    return ctx.user!;
  }
}
