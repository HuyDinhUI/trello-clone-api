import mongoose from "mongoose";

const LoginLog = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  ip: { type: String, required: true },
  geo: { type: Object },
  device: { type: Object },
  failed_attempt: { type: Number, default: 0 },
  login_result: { type: String, enum: ["success", "failed"], required: true },
  verdict: {type: Object}
}, { timestamps: true });

export const LoginLogs = mongoose.model("LoginLogs", LoginLog);