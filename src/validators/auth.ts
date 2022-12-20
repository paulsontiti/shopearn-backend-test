import { validationResult, check } from 'express-validator';

export const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  } else {
    next();
  }
};

export const validateSignUpRequest = [
  check('firstname').isEmpty().withMessage('firstname is required'),
  check('lastname').isEmpty().withMessage('lastname is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 charecters'),
  check('email')
    .isEmail()
    .withMessage('email must be in this format -example@gmail.com/@yahoo.com'),
];
export const validateSignInRequest = [
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 charecters'),
  check('email')
    .isEmail()
    .withMessage('email must be in this format -example@gmail.com/@yahoo.com'),
];

export const validateCreateCategoryRequest = [
  check('name').isEmpty().withMessage('name is required'),
];
