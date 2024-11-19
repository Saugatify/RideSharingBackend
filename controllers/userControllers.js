import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"; // Ensure the path is correct
import Rider from "../models/riderModel.js"
import jwt from "jsonwebtoken";


//@user/register

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, location, destination,role } = req.body;

    // Validate input fields
    if (!name || !email || !password || !location || !destination) {
        return res.status(400).json({ message: "All fields are required" });
    }


    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        location,
        destination
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role:newUser.role,
            location: newUser.location,
            destination: newUser.destination
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});



//@desc Login a user
//@route POST /user/login
//@access public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
        user: { name:user.name,
            id: user.id,
            email: user.email 
        },
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn :"5m"
        }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
  }
},
);


//@user/getriders


  const getRiderData = asyncHandler(async (req, res) => {
    try {
      const riders = await Rider.find({}, 'name location destination');
      res.status(200).json(riders);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });


export default { registerUser, getRiderData,loginUser};
