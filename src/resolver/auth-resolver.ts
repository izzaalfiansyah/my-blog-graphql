import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AuthInput } from "./params/auth-params";
import { User } from "../entity/user";
import { Context } from "../entity/context";
import { users } from "../data/user";
import jwt from "jsonwebtoken";

export const PRIVATE_KEY = "ITSASECRETFORMYBLOGAPPLICATION";

@Resolver()
export class AuthResolver {
  @Mutation(() => String, { nullable: true })
  async login(@Arg("input") input: AuthInput): Promise<string> {
    const user = users.find((user) => user.email == input.email);

    if (!user) {
      throw new Error("email salah");
    }

    if (input.password != user.password) {
      throw new Error("password salah");
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      PRIVATE_KEY,
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );

    return token;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: Context): Promise<User> {
    return ctx.user!;
  }
}
