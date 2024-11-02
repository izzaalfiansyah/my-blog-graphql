import IORedis from "ioredis";

export const redis =
  process.env.NODE_ENV == "production"
    ? new IORedis({
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as any,
      })
    : new IORedis();
