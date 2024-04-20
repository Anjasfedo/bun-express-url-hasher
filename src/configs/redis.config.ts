import redis from "redis";
import ENV from "@configs/env.config";

const REDIS_URL = `redis://:@${ENV.REDIS_HOST}:${ENV.REDIS_PORT}`;

const redisClient = redis.createClient({
  url: REDIS_URL,
});

redisClient.connect().catch(console.error);

redisClient.on("connect", () => {
  console.log("Connected to Redis server");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis server:", error);
  process.exit(1);
});

export default redisClient;
