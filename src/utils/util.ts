import bcrypt from "bcryptjs";

const generateRandomString = (length: number): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

export const createLongUrl = (
  originalUrl: string,
  callback: (error: Error | null, longUrl?: string) => void
) => {
  // Generate a random string excluding specific characters
  const randomString = generateRandomString(50);

  // Concatenate the original URL and the random string
  const combinedString = originalUrl + randomString;

  // Hash the combined string using bcrypt
  bcrypt.hash(combinedString, 10, (error, hash) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      // Use the hashed combined string as the long URL
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
