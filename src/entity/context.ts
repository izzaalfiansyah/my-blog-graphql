import { Request } from "express";
import { User } from "./user";

export class Context {
  req: Request;
  user: User | null;
}
