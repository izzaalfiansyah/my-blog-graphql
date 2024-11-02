import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entity/post";
import { PostInput, PostsArgs } from "./params/post-params";
import { supabase } from "../utils/supabase";
import { dateNow } from "../utils/date-now";

export const postRepository = supabase.from("posts");

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Args() args: PostsArgs): Promise<Post[]> {
    const query = postRepository.select("*").order("createdAt", {
      ascending: false,
    });

    if (!!args.isPublished) {
      query.eq("isPublished", args.isPublished);
    }

    const limit = args.limit || 5;

    if (!!args.page) {
      query.range((args.page - 1) * limit, limit);
    } else {
      query.range(0, limit);
    }

    const { data: posts, error } = await query;

    if (error) {
      throw error;
    }

    return posts || [];
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<Post | null> {
    const { data: posts } = await postRepository.select("*").eq("id", id);

    const post = posts![0] || null;

    return post;
  }

  @Query(() => Post, { nullable: true })
  async postBySlug(@Arg("slug") slug: string): Promise<Post | null> {
    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .ilike("title", `${slug.replace("-", " ")}`);

    const post = posts![0] || null;

    return post;
  }

  @Mutation(() => Boolean)
  async createPost(@Arg("input") input: PostInput): Promise<boolean> {
    const res = await postRepository.insert(input);

    if (res.error) {
      throw res.error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async updatePost(
    @Arg("id") id: number,
    @Arg("input") input: PostInput
  ): Promise<boolean> {
    const res = await postRepository
      .update({ ...input, updatedAt: dateNow })
      .eq("id", id);

    if (res.error) {
      throw res.error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async publishPost(@Arg("id") id: number): Promise<boolean> {
    const res = await postRepository
      .update({
        isPublished: true,
        updatedAt: dateNow,
      })
      .eq("id", id);

    if (res.error) {
      throw res.error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async unPublishPost(@Arg("id") id: number): Promise<boolean> {
    const res = await postRepository
      .update({
        isPublished: false,
        updatedAt: dateNow,
      })
      .eq("id", id);

    if (res.error) {
      throw res.error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    const res = await postRepository.delete().eq("id", id);

    if (res.error) {
      throw res.error;
    }

    return true;
  }
}
