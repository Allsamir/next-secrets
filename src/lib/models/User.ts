import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
