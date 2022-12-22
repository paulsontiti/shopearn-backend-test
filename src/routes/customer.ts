import express from 'express';
import { check } from 'express-validator';
import { getCustomers, signin, signup } from '../controllers/customer.js';
import { isAdmin } from '../middleware/admin.js';
import { auth } from '../middleware/common.js';
import {
  isRequestValidated,
  validateSignInRequest,
  validateSignUpRequest,
} from '../validators/auth.js';

const customerRouter = express.Router();

customerRouter.post('/signup', signup);
customerRouter.post('/signin', signin);
customerRouter.get('/', auth, isAdmin, getCustomers);

export default customerRouter;
