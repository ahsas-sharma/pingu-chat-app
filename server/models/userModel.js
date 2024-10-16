import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      default: '',
    },
    profilePic: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'available',
      enum: ['available', 'dnd', 'away', 'invisible'],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema, 'users');
export default User;
