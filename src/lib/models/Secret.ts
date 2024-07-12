import mongoose from "mongoose";

const singleSecretSchema = new mongoose.Schema(
  {
    secret: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const secretSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    secret: [singleSecretSchema],
  },
  {
    timestamps: true,
  },
);

const Secret = mongoose.models.Secret || mongoose.model("Secret", secretSchema);

export default Secret;
