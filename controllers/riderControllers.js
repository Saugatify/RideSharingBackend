import asyncHandler from 'express-async-handler';
import Rider from '../models/riderModel.js';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Log from '../models/logModel.js';


//@rider/register

const registerRider = asyncHandler(async (req, res) => {
  const { name, email, password, location, destination,role } = req.body;

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
    role,
    location,
    destination
  });

  if (newRider) {
    res.status(201).json({
      _id: newRider._id,
      name: newRider.name,
      email: newRider.email,
      location: newRider.location,
      role:newRider.role,
      destination: newRider.destination 
    });
  } else {
    res.status(400).json({ message: 'Invalid rider data' });
  }
});


//@desc Login a rider
//@route POST /rider/login
//@access public
const riderlogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required");
  }

  const rider = await Rider.findOne({ email });
  if (rider && (await bcrypt.compare(password, rider.password))) {
      const accessToken = jwt.sign(
          {
              rider: { id: rider._id, name: rider.name, email: rider.email }, // Ensure this matches what you use in the middleware
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
  } else {
      res.status(401).json({ message: "Invalid email or password" });
  }
});





//@rider/getuser
const getAllUser = asyncHandler(async (req, res) => {
  try {
      console.log(`Authenticated User: ${JSON.stringify(req.user)}`); // This should log the correct user data

      const users = await User.find({}, 'name location destination role');
      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Server Error' });
  }
});



//getUserData

const getUserData = asyncHandler(async (req, res) => {
  const rider = req.user; 
  const { id } = req.params;

  if (!rider) {
    return res.status(403).json({ message: 'Access denied: rider not authenticated' });
  }

  try {
      // Fetch the user by ID
      const user = await User.findById(id, 'name location destination role');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Log the rider's access to this user's data
      const logEntry = await Log.create({
          riderName: rider.name,
          riderId: rider.id,
          userId: user._id,
          userName: user.name,
      });

      // Log the access in the console
      console.log(`Rider ${rider.name} (ID: ${rider._id}) accessed user ${user.name} (ID: ${user._id})`);

      // Respond with the user data
      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


export default { getUserData, registerRider, riderlogin, getAllUser };





