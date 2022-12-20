import mongoose from 'mongoose';
//costprice
//competitors price
//profitable points
//commissional points
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    offer: {
        type: Number,
    },
    quantity: { type: Number, required: true },
    img: {
        type: String,
        required: true,
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            review: String,
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, { timestamps: true });
productSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    },
});
const Product = mongoose.model('Product', productSchema);
export default Product;
//# sourceMappingURL=product.js.map