import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const newUser = await user.findOne({ email });
    if (!newUser) { 
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch) res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, newUser: { id: newUser._id, name: newUser.name, email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
