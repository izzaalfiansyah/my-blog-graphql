import { YogaInitialContext } from "graphql-yoga";
import { Context } from "../entity/context";
import { User } from "../entity/user";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../resolver/auth-resolver";
import { users } from "../data/user";

export async function yogaContext({
  request: req,
}: YogaInitialContext): Promise<Context> {
  let user: User | null = null;

  try {
    const token: string = req.headers
      .get("authorization")
      ?.replace("Bearer ", "") as string;

    const { email }: any = jwt.verify(token, PRIVATE_KEY);

    user = users.find((user) => user.email == email)!;
  } catch (err) {
    // console.log("Unauthorized");
  }

  return {
    req: req as any,
    user,
  };
}
