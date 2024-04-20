import ENV from "@configs/env.config";
import redisClient from "@configs/redis.config";
import { compareUrls, createLongUrl } from "@util/util";
import express from "express";
import type { Request, Response } from "express";
import querystring from 'querystring';

const PORT = ENV.PORT;
const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hewroo World!");
});

app.get("/:url", async (req: Request, res: Response) => {
  const hashedUrl = req.originalUrl.split('/')[1];

  const originalUrl = await redisClient.get(hashedUrl);

  if (!originalUrl) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res.status(200).json({ message: JSON.parse(originalUrl) });
});

app.post("/createurl", async (req: Request, res: Response) => {
  const originalUrl: string = req.body.url;

  createLongUrl(originalUrl, (error: Error | null, longUrl?: string) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  
    if (!longUrl) {
      return res.status(500).json({ error: 'Failed to generate long URL' });
    }

    const encodedLongUrl = encodeURIComponent(longUrl);
  
    redisClient.setEx(encodedLongUrl, 600, JSON.stringify({ url: originalUrl }));
  
    return res.status(200).json({ url: encodedLongUrl });
  });
})

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
