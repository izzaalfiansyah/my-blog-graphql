import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Post } from "../entity/post";
import { PostInput } from "./params/post-params";
import { supabase } from "../utils/supabase";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await supabase
      .from("posts")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .eq("is_published", true);

    return posts.data || [];
  }

  @Query(() => Post)
  async post(@Arg("slug") slug: string): Promise<Post> {
    const post = await supabase
      .from("posts")
      .select("*")
      .eq("title", slug.replace("-", " "));

    return post.data![0] as Post;
  }

  @Mutation(() => Boolean, { nullable: true })
  async createPost(@Arg("input") input: PostInput): Promise<boolean> {
    const res = await supabase.from("posts").insert(input);

    if (res.error) {
      throw res.error;
    }

    return true;
  }

  @FieldResolver(() => [String])
  tags(@Root() post: Post): string[] {
    return JSON.parse(post.tags as any);
  }
}
