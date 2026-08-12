import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companies",
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["supervisor", "technician", "receptionist"],
      default: "technician",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ company_id: 1, username: 1 }, { unique: true });

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
