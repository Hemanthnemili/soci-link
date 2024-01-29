import User from "../models/auth.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const welcome = (req, res) => {
  res.status(200).json({ message: "Welcome to my server " });
};
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(404).json({ error: "User Already Registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ error: "User Not Found!! Register Now" });

    if (!username || !password || username === "" || password === "")
      return res.status(404).json({ error: "All fields are required" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(404).json({ error: "INVALID PASSWORD" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
      expiresIn: "15d",
    });

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
