import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoriesList,
  getCategoriesName,
} from '../controllers/category.js';
import { isAdmin } from '../middleware/admin.js';
import { auth, imgUploader } from '../middleware/common.js';

const categoryRouter = express.Router();

categoryRouter.post(
  '/create',
  auth,
  isAdmin,
  imgUploader().single('img'),
  createCategory
);

categoryRouter.get('/', getCategories);
categoryRouter.get('/getCategoriesList', getCategoriesList);

categoryRouter.get('/getCategoriesName', getCategoriesName);
export default categoryRouter;
