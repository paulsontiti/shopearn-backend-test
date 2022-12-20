import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    img: {
        type: String,
        required: true,
    },
    parentId: {
        type: String,
    },
}, { timestamps: true });
categorySchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    },
});
const Category = mongoose.model('Category', categorySchema);
export default Category;
//# sourceMappingURL=category.js.map