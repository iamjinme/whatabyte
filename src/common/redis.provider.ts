import { createClient } from "redis";

const REDIS_PORT = parseInt(process.env.REDIS_PORT as string, 10);
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

type RedisClientType = ReturnType<typeof createClient>;

const start = async (): Promise<RedisClientType> => {
  const client: RedisClientType = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    }
  });

  await client.connect();

  return client;
};

export default class Redis {
  private static client: RedisClientType;

  private constructor() {};

  public static getClient(): RedisClientType {
    if (!Redis.client) {
      console.log('Redis client created');
      Redis.client = createClient({
        password: REDIS_PASSWORD,
        socket: {
            host: REDIS_HOST,
            port: REDIS_PORT,
        }
      });
    }
    console.log('Redis client cached');
    return Redis.client;
  };
};