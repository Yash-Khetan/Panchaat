import userSchema from "../models/userSchema";
import jwt from "jsonwebtoken"; 
export const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find({}, '-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userSchema.findOne({ $or: [ { email }, { username } ] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new userSchema({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
};

