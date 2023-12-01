import Tweet from "../models/tweetModel.js";
import User from "../models/userModel.js";
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

export const likeOrDislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("Tweet has been liked!");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("Tweet has been disliked!");
    }
  } catch (error) {
    next(error);
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: req.params.id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );
    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (error) {
    next(error);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (error) {
    next(error);
  }
};

export const getExploreTweets = async (req, res, next) => {
  try {
    const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort({
      likes: -1,
    });
    res.status(200).json(exploreTweets);
  } catch (error) {
    next(error);
  }
};
