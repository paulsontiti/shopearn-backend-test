import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
//routes
import userRouter from './routes/user.js';
import categoryRouter from './routes/category.js';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
const app = express();
env.config();
//connect to db
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (err)
        return console.log(err.message);
    console.log('connected to database');
});
app.use(cors()); // Use this after the variable declaration
//middlewares
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello Worxxld!' });
});
app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map