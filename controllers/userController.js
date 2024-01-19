import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const userRegisterController = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const user = User.findOne({ username });
    if (user) {
      res.json({ message: "user is already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      phone,
    });
    await newUser.save();
    return res.json({ registered: true });
  } catch (error) {
    return res.status(500);
  }
};
