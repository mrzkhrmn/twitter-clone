import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const user = await User.findById(req.body.id);
    user.posts.push(post);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
