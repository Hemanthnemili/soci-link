import mongoose from "mongoose";

const userSechema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/d-icon-avatar-cartoon-hipster-character-d-icon-avatar-cartoon-hipster-character-291470398.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSechema);

export default User;
