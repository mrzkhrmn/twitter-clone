import Tweet from "../models/tweetModel.js";
import { errorHandler } from "../utils/error.js";

export const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (error) {
    errorHandler(500, error);
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const tweetToDelete = await Tweet.findById(req.params.id);
    if (tweetToDelete.userId === req.body.id) {
      await tweetToDelete.deleteOne();
      res.status(200).json("Tweet has been deleted successfully");
    } else {
      errorHandler(500);
    }
  } catch (error) {
    errorHandler(500, error);
  }
};
