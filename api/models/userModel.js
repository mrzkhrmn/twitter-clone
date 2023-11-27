import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    posts: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        description: { type: mongoose.Schema.Types.String, ref: "Post" },
        imageUrl: { type: mongoose.Schema.Types.String, ref: "Post" },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
