import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const shippingAddressSchema = new mongoose.Schema({
    recieversName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
});
const paymentDetailsSchema = new mongoose.Schema({
    given_name: { type: String, required: true },
    surname: { type: String, required: true },
    payer_id: { type: String, required: true },
    country_code: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String },
});
const orderSchema = new mongoose.Schema({
    cartProducts: [productSchema],
    totalPrice: { type: Number, required: true },
    shippingAddress: { shippingAddressSchema },
    paymentDetails: { paymentDetailsSchema },
    paymentMethod: { type: String, required: true },
    paid: { type: Boolean, default: false },
    paidDate: { type: Date },
    delivered: { type: Boolean, default: false },
    deliveredDate: { type: Date },
}, { timestamps: true });
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orders: [orderSchema],
}, { timestamps: true });
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
//# sourceMappingURL=cart.js.map