import IORedis from "ioredis";

export const redis = new IORedis({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT as any,
});
