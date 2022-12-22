import Customer from '../models/customer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (cust) => {
  //generate a toke for user
  return jwt.sign({ _id: cust._id, role: cust.role }, process.env.JWT_TOKEN, {
    expiresIn: '1h',
  });
};

export const signup = (req, res) => {
  Customer.findOne({ email: req.body.cust.email }).exec((err, oldcust) => {
    if (err) return res.status(400).json({ mesage: err.message });
    if (oldcust)
      return res.status(400).json({
        message: `Another person with the email-${req.body.cust.email} already exist`,
      });
    const { email, password } = req.body.cust;
    new Customer({
      email,
      password,
    }).save((err, cust) => {
      if (err) return res.status(400).json({ mesage: err.message });
      if (cust)
        res.status(200).json({
          details: cust,
          token: generateToken(cust),
        });
    });
  });
};

export const signin = (req, res) => {
  Customer.findOne({ email: req.body.email }).exec((err, cust) => {
    if (err) return res.status(400).json({ mesage: 'Somethings went wrong' });
    if (cust) {
      try {
        if (bcrypt.compareSync(req.body.password, cust.hashPassword)) {
          res.status(200).json({
            details: cust,
            token: generateToken(cust),
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
export const getCustomers = (req, res) => {
  Customer.find({}).exec((err, custs) => {
    if (err) return res.status(400).json({ message: err.message });
    //else continue
    if (custs) {
      return res.status(201).json({ custs });
    }
  });
};
