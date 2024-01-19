import express from "express";
import bcrypt from "bcrypt";
import { creatorModel } from "./models/Creator.js";
import "./db.js";

const creatorAccount = async () => {
  try {
    const creatorCount = await creatorModel.countDocuments();
    console.log("====================================");
    console.log(creatorCount);
    console.log("====================================");
    if (creatorCount === 0) {
      const hashedPassword = await bcrypt.hash("creatorpassword", 10);
      const newCreator = new creatorModel({
        username: "creator",
        password: hashedPassword,
      });
      await newCreator.save();
      console.log("account created successfully");
    } else {
      console.log("account already exist");
    }
  } catch (error) {
    console.log(error.message);
  }
};

creatorAccount();
