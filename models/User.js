import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail, // passing the reference
      message: "Please provide a valid email",
    },
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "Please provide Age"],
  },
  batch: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, "Please provide Batch number"],
  },
  month: {
    type: Number,
  },
});

export default mongoose.model("User", UserSchema);
