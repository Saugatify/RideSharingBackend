import mongoose from "mongoose";
const riderSchema = mongoose.Schema(
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
      default:"rider",
    },
    destination:{
        type: String,
        required: [true, "Please add the location"]
    },
    status:{
      type:[],
    }
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Rider",riderSchema)