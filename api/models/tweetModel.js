import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    description: { type: String, required: true, max: 280 },
    liked: { type: Array, defaultValue: [] },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;
