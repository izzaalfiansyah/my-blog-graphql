import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { AuthInput } from "./params/auth-params";
import { User } from "../entity/user";
import { userData } from "../data/user";
import { hash } from "bcrypt";

@Resolver()
export class AuthResolver {
  user: User;

  constructor() {
    this.user = userData;
  }

  @Mutation(() => String, { nullable: true })
  async login(@Arg("input") input: AuthInput): Promise<string | null> {
    try {
      if (input.email != this.user.email) {
        throw new Error("email salah");
      }

      if (input.password != this.user.password) {
        throw new Error("password salah");
      }

      const token = await hash(this.user.email, 10);

      return token;
    } catch (e) {
      return null;
    }
  }

  @Authorized()
  @Query(() => User)
  async profile(): Promise<User> {
    return this.user;
  }
}
