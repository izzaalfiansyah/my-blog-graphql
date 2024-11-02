import { ResolverData } from "type-graphql";
import { Context } from "../entity/context";

export const authChecker = ({ context }: ResolverData<Context>): boolean => {
  if (!context.user) {
    return false;
  }

  return true;
};
