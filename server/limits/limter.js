import rateLimit from "express-rate-limit";
export const signlimiter = rateLimit({
  max: 5,
  windowMS: 10000, // 10 seconds
  message: "You can't make any more requests at the moment. Try again later",
});
export const limiter = rateLimit({
  max: 15,
  windowMS: 5000, // 10 seconds
  message: "Please try again in few moments",
});
