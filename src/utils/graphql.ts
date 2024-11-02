import { buildSchema } from "type-graphql";
import { AuthResolver } from "../resolver/auth-resolver";
import { authChecker } from "./auth-checker";
import { PostResolver } from "../resolver/post-resolver";

export const schema = buildSchema({
  resolvers: [AuthResolver, PostResolver],
  authChecker,
});
