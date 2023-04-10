import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      length: 128,
    },
    salt: {
      type: String,
      required: true,
      length: 32,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    verificationCode: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const users = mongoose.model("users", user);

export default users;
