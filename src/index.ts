import ENV from "@configs/env.config";
import redisClient from "@configs/redis.config";
import { compareUrls, createLongUrl } from "@util/util";
import express from "express";
import type { Request, Response } from "express";

const PORT = ENV.PORT;
const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hewroo World!");
});

app.get("/:url", async (req: Request, res: Response) => {
  const originalUrl = req.params.url;

  compareUrls(
    "https://www.example.com",
    "$2a$10$co90mIVIeBfS0Vq1x2F4Ju2BUQhHXQZQ6bOj/.FmSNTPL9MecW6iG",
    (error, match) => {
      if (error) {
        console.error("Error:", error);
      } else {
        if (match) {
          console.log("URLs match");
        } else {
          console.log("URLs do not match");
        }
      }
    }
  );

  createLongUrl("https://www.example.com", (error, longUrl) => {
    if (error) console.error("Error:", error);

    redisClient.setEx(originalUrl, 600, JSON.stringify({ url: longUrl }));

    return res.status(200).json({ url: longUrl });
  });
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
