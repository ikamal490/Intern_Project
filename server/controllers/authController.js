import otpGenerator from "otp-generator";
import User from "../models/User.js";

export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false
  });

  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  await User.findOneAndUpdate(
    { phone },
    { otp, otpExpiry: expiry },
    { upsert: true }
  );

  console.log("OTP:", otp); // later integrate SMS API

  res.json({ success: true });
};

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false });
  }

  res.json({ success: true });
};
