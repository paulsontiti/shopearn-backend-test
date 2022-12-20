import express from 'express';
import { addToCart } from '../controllers/cart.js';
import { isUser } from '../middleware/user.js';
import { auth } from '../middleware/common.js';

const cartRouter = express.Router();

cartRouter.post('/addtocart', auth, isUser, addToCart);

export default cartRouter;
