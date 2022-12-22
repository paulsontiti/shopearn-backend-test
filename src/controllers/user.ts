import user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  //generate a toke for user
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_TOKEN, {
    expiresIn: '1h',
  });
};

export const signup = (req, res) => {
  user.findOne({ email: req.body.user.email }).exec((err, oldUser) => {
    if (err) return res.status(400).json({ mesage: err.message });
    if (oldUser)
      return res.status(400).json({
        message: `Another person with the email-${req.body.user.email} already exist`,
      });
    const { email, password } = req.body.user;
    new user({
      email,
      password,
    }).save((err, user) => {
      if (err) return res.status(400).json({ mesage: err.message });
      if (user)
        res.status(200).json({
          details: user,
          token: generateToken(user),
        });
    });
  });
};

export const signin = (req, res) => {
  user.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ mesage: 'Somethings went wrong' });
    if (user) {
      try {
        if (bcrypt.compareSync(req.body.password, user.hashPassword)) {
          res.status(200).json({
            details: user,
            token: generateToken(user),
          });
        } else {
          res.status(400).json({ message: 'invalid email/password' });
        }
      } catch (err) {
        return console.log(err.mesage);
      }
    } else {
      res.status(400).json({ message: 'invalid email/password' });
    }
  });
};
export const getUsers = (req, res) => {
  user.find({}).exec((err, users) => {
    if (err) return res.status(400).json({ message: err.message });
    //else continue
    if (users) {
      return res.status(201).json({ users });
    }
  });
};
