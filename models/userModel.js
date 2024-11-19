import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    },
    location:{
        type: String,
        required: [true, "Please add the location"]
    },
    role:{
      type:String,
      default:"user",
    },
    destination:{
        type: String,
        required: [true, "Please add the location"]
    },

    status:{
      type:[]
    }

  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User",userSchema)