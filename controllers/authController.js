import { creatorModel } from "../models/Creator.js";
import { User } from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
  try {
    const { username, password, role, email, phone, address, age } = req.body;
    if (role === "creator") {
      console.log(role, "in role= creator if");
      const creator = await creatorModel.findOne({ username });
      if (!creator) {
        console.log(role, "entered in role= creator if no creator present");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCreator = new creatorModel({
          username,
          email,
          password: hashedPassword,
          phone,
          address,
          age,
          role,
        });
        await newCreator.save();
        console.log("account created successfully");
        const newlyCreatedCreator = await creatorModel.findOne({ username });
        const token = jwt.sign(
          { username: newlyCreatedCreator.username, role: "creator" },
          process.env.SECRET_KEY
        );
        res.cookie("token", token, { httpOnly: true, secure: true });
        return res.status(201).json({
          login: true,
          message: "Login successful",
          role: "creator",
          username: newlyCreatedCreator.username,
        });
      }
      const isValidPassword = await bcrypt.compare(password, creator.password);
      if (!isValidPassword) {
        return res.json({ message: "invalid password" });
      }
      const token = jwt.sign(
        { username: creator.username, role: "creator" },
        process.env.SECRET_KEY
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.status(201).json({
        login: true,
        message: "Login successful",
        role: "creator",
        username: creator.username,
      });
    } else if (role === "user") {
      console.log(role, "in role= user if");
      const user = await User.findOne({ username });
      if (!user) {
        console.log(role, "in role= user if user not present");
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            username,
            email,
            password: hashPassword,
            phone,
            role,
          });
          await newUser.save();
          return res.status(200).json({ registered: true });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.json({ message: "invalid password" });
      }
      const token = jwt.sign(
        { username: user.username, role: "user" },
        process.env.SECRET_KEY_USER
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.status(201).json({
        login: true,
        message: "Login successful",
        role: "user",
        username: user.username,
      });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const getRoleController = (req, res) => {
  return res.json({ login: true, role: req.role });
};

export const logOutController = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ logout: true });
};
