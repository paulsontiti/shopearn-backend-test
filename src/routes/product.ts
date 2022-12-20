import express from 'express';
import { createProduct, getProducts } from '../controllers/product.js';
import { isAdmin } from '../middleware/admin.js';
import { auth, imgUploader } from '../middleware/common.js';
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

const productRouter = express.Router();

productRouter.post(
  '/create',
  auth,
  isAdmin,
  imgUploader().single('img'),
  createProduct
);

productRouter.get('/', auth, isAdmin, getProducts);

export default productRouter;
