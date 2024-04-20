import ENV from "@configs/env.config";
import redisClient from "@configs/redis.config";
import express from "express";
import type { Request, Response } from "express";

const PORT = ENV.PORT;
const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hewroo World!");
});

app.get("/:url", async (req: Request, res: Response) => {
  const url = req.params.url;
    redisClient.setEx(url, 600, JSON.stringify({ abc: "cde" }));
  return res.status(200).json({ url });
});

const start = (): void => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
