import bcrypt from "bcryptjs";

export const createLongUrl = (
  originalUrl: string,
  callback: (error: Error | null, hash?: string) => void
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

export const compareUrls = (
  originalUrl: string,
  hashedUrl: string,
  callback: (error: Error | null, match?: boolean) => void
) => {
  bcrypt.compare(originalUrl, hashedUrl, (err, result) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
