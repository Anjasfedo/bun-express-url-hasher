import bcrypt from "bcryptjs";

export const createLongUrl = (
  originalUrl: string,
  callback: (error: Error | null, longUrl?: string) => void
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
