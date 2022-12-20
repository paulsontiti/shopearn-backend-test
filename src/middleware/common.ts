import jwt from 'jsonwebtoken';

import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

export const imgUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(''), 'uploads/img'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    },
  });
  return multer({ storage });
};

export const auth = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_TOKEN);
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(400)
          .json({ message: 'invalid request from an unauthorized user' });
      }
    } catch (err) {
      return res.status(400).json({ message: err.TokenExpiredError });
    }
  } else {
    return res
      .status(400)
      .json({ message: 'invalid request from an unauthorized user' });
  }
};
