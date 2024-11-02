import { buildSchema } from "type-graphql";
import { AuthResolver } from "../resolver/auth-resolver";
import { authChecker } from "./auth-checker";

export const schema = buildSchema({
  resolvers: [AuthResolver],
  authChecker,
});
