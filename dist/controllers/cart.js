import Cart from '../models/cart.js';
//this function adds an order to the user cart
const addOrderToCart = (req, res, orders, newOrder) => {
    orders.push(newOrder);
    const newCart = new Cart({
        user: req.user._id,
        orders: orders,
    });
    newCart.save((err, cart) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ err });
        }
        if (cart) {
            console.log('new cart:', cart);
            return res.status(201).json({ successful: true });
        }
    });
};
export const addToCart = (req, res) => {
    if (req.body.order) {
        //check if user has a cart record
        Cart.findOne({ user: req.user._id }).exec((err, cart) => {
            if (err)
                return res.status.json({ err });
            if (cart) {
                //delete the existing cart
                Cart.deleteOne({ user: req.user._id }).exec((err, deletedCart) => {
                    if (err)
                        return res.status(500).json({ message: 'Database error' });
                    if (deletedCart) {
                        //create new cart with the previous orders and the new order
                        const orders = cart.orders;
                        addOrderToCart(req, res, orders, req.body.order);
                    }
                });
            }
            else {
                //add new cart record
                const newCart = [];
                addOrderToCart(req, res, newCart, req.body.order);
            }
        });
    }
    else {
        return res.status(400).json({ message: 'invalid request/cart empty' });
    }
};
//# sourceMappingURL=cart.js.map