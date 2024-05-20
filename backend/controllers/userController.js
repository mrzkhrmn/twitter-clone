import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    s;
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: { _id: { $ne: userId } },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((suggestedUser) => (suggestedUser.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { fullName, username, email, bio, link, currentPassword, newPassword } =
    req.body;
  let { coverImg, profileImg } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found!" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(404)
        .json({ error: "Please provide both current and new password!" });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });

      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userToFollow = await User.findById(id);
    if (!userToFollow) return res.status(404).json({ error: "User not found" });
    const currentUser = await User.findById(req.user._id);
    if (!currentUser)
      return res.status(404).json({ error: "Current user not found" });

    if (id === req.user._id)
      return res
        .status(400)
        .json({ error: "You cant follow/unfollow yourself" });

    const isFollowing = currentUser.following.includes(userToFollow._id);

    if (isFollowing) {
      // Unfollow
      await User.findByIdAndUpdate(userToFollow._id, {
        $pull: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { following: userToFollow._id },
      });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow
      await User.findByIdAndUpdate(userToFollow._id, {
        $push: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { following: userToFollow._id },
      });

      const newNotification = new Notification({
        from: req.user._id,
        to: userToFollow._id,
        type: "follow",
      });

      await newNotification.save();

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
