import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/teenage-boy-mohawk-wearing-green-hoodie-smirking-camera-digital-character-avatar-ai-generation-270471572.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
