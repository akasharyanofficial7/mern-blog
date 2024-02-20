import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(400, "required all fields"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler);
  }
};
