
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  avatar: String,
  googleId: { type: String, unique: true, sparse: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, default: null, unique: true },
  password: { type: String, default: null },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
}, { timestamps: true }
);

export const User = mongoose.model('Users', userSchema)