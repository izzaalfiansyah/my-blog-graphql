import { DataSource } from "typeorm";
import { Post } from "../entity/post";

export const DB = new DataSource({
  type: "sqlite",
  database: "my-blog",
  logging: true,
  synchronize: true,
  entities: [Post],
});
