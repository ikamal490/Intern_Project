import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: String,
  otp: String,
  otpExpiry: Date
});

export default mongoose.model("User", userSchema);
