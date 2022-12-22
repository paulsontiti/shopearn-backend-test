import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    contact: {
      type: String,
    },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

//hash the
userSchema.virtual('password').set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  aunthenticate: function (password) {
    return bcrypt.compareAsync(password, this.hashPassword);
  },
};

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const user = mongoose.model('User', userSchema);
export default user;
