import { YogaInitialContext } from "graphql-yoga";
import { Context } from "../entity/context";
import { User } from "../entity/user";
import { compare } from "bcrypt";
import { userData } from "../data/user";

export async function yogaContext({
  request: req,
}: YogaInitialContext): Promise<Context> {
  let user: User | null = null;

  try {
    const token: string = req.headers
      .get("authorization")
      ?.replace("Bearer ", "") as string;

    const isValid = await compare(userData.email, token);

    if (isValid) {
      user = userData;
    }
    console.log(user);
  } catch (err) {
    console.log("Unauthorized");
  }

  return {
    req: req as any,
    user,
  };
}
