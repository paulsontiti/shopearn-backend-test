import express from 'express';
import { getUsers, signin, signup } from '../controllers/user.js';
import { isAdmin } from '../middleware/admin.js';
import { auth } from '../middleware/common.js';
const userRouter = express.Router();
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/', auth, isAdmin, getUsers);
export default userRouter;
//# sourceMappingURL=user.js.map