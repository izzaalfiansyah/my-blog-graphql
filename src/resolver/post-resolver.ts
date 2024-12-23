import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Post } from "../entity/post";
import { PostInput, PostsArgs } from "./params/post-params";
import { supabase } from "../utils/supabase";
import { dateNow } from "../utils/date-now";
import { PRIVATE_KEY } from "./auth-resolver";
import { redis } from "../utils/ioredis";

const cache = {
  post: (id: any) => PRIVATE_KEY + "-POST:" + id,
};

@Resolver(() => Post)
export class PostResolver {
  repo() {
    return supabase.from("posts");
  }

  @Query(() => [Post])
  async posts(@Args() args: PostsArgs): Promise<Post[]> {
    const query = this.repo().select("*").order("createdAt", {
      ascending: false,
    });

    if (!!args.isPublished) {
      query.eq("isPublished", args.isPublished);
    }

    const { data: posts, error } = await query;

    if (error) {
      throw error;
    }

    return posts || [];
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: string): Promise<Post | null> {
    // const cachePost = await redis.get(cache.post(id));

    // if (cachePost) {
    //   return JSON.parse(cachePost);
    // }

    const { data: posts } = await this.repo()
      .select("*")
      .eq("id", parseInt(id));

    const post = posts![0] || null;

    // if (!!post) {
    //   await redis.set(cache.post(id), JSON.stringify(post));
    // }

    return post;
  }

  @Query(() => Post, { nullable: true })
  async postBySlug(@Arg("slug") slug: string): Promise<Post | null> {
    const { data: postsBySlug } = await supabase
      .from("posts")
      .select("id")
      .ilike("title", `${slug.replace(/-/gi, " ")}%`);

    const id = postsBySlug![0].id;

    // const cachePost = await redis.get(cache.post(id));

    // if (cachePost) {
    //   return JSON.parse(cachePost);
    // }

    const { data: posts } = await supabase
      .from("posts")
      .select("*")
      .eq("id", parseInt(id));

    const post = posts![0] || null;

    // if (!!post) {
    //   await redis.set(cache.post(id), JSON.stringify(post));
    // }

    return post;
  }

  @Mutation(() => Boolean)
  async createPost(@Arg("input") input: PostInput): Promise<boolean> {
    const res = await this.repo().insert(input);

    if (res.error) {
      throw res.error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async updatePost(
    @Arg("id") id: string,
    @Arg("input") input: PostInput
  ): Promise<boolean> {
    const res = await this.repo()
      .update({ ...input, updatedAt: dateNow })
      .eq("id", parseInt(id));

    if (res.error) {
      throw res.error;
    }

    await this.deleteCachePost({ id: id });

    return true;
  }

  @Mutation(() => Boolean)
  async publishPost(@Arg("id") id: string): Promise<boolean> {
    const res = await this.repo()
      .update({
        isPublished: true,
        updatedAt: dateNow,
      })
      .eq("id", parseInt(id));

    if (res.error) {
      throw res.error;
    }

    await this.deleteCachePost({ id: id });

    return true;
  }

  @Mutation(() => Boolean)
  async unPublishPost(@Arg("id") id: string): Promise<boolean> {
    const res = await this.repo()
      .update({
        isPublished: false,
        updatedAt: dateNow,
      })
      .eq("id", parseInt(id));

    if (res.error) {
      throw res.error;
    }

    await this.deleteCachePost({ id: id });

    return true;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string): Promise<boolean> {
    const res = await this.repo().delete().eq("id", parseInt(id));

    if (res.error) {
      throw res.error;
    }

    await this.deleteCachePost({ id: id });

    return true;
  }

  async deleteCachePost({ id }: { id?: any }) {
    // if (id) {
    //   const cachePost = await redis.get(cache.post(id));
    //   if (!!cachePost) {
    //     await redis.del(cache.post(id));
    //   }
    // }
  }

  @FieldResolver(() => String)
  slug(@Root() post: Post): string {
    return post.title.replace(/ /gi, "-").toLowerCase();
  }
}
