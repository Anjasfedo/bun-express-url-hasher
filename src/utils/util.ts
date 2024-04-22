import bcrypt from "bcryptjs";

export const createhashUrl = (
  originalUrl: string,
  callback: (error: Error | null, hashUrl?: string) => void
) => {
  bcrypt.hash(originalUrl, 10, (error, hash) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      callback(null, hash);
    }
  });
};
