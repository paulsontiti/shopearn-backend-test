import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
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
customerSchema.virtual('password').set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
});

customerSchema.methods = {
  aunthenticate: function (password) {
    return bcrypt.compareAsync(password, this.hashPassword);
  },
};

customerSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
