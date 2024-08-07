import asyncHandler from 'express-async-handler';
import Rider from '../models/riderModel.js';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";


const registerRider = asyncHandler(async (req, res) => {
  const { name, email, password, location, destination } = req.body;

  if (!name || !email || !password || !location || !destination) {
    return res.status(400).json({ message: "All fields are required" });
  }


   // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  const newRider = await Rider.create({
    name,
    email,
    password: hashedPassword,
    location,
    destination
  });

  if (newRider) {
    res.status(201).json({
      _id: newRider._id,
      name: newRider.name,
      email: newRider.email,
      location: newRider.location,
      destination: newRider.destination
    });
  } else {
    res.status(400).json({ message: 'Invalid rider data' });
  }
});

const getUserData = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, 'name location destination');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default { registerRider, getUserData };
