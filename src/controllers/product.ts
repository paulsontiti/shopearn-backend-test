import Product from '../models/product.js';
import slugify from 'slugify';

export const createProduct = (req, res) => {
  try {
    Product.findOne({ slug: slugify(req.body.name) }).exec((err, pro) => {
      if (err || pro) {
        return res
          .status(400)
          .json({ message: 'Product with same name already exist' });
      } else {
        try {
          const { name, price, description, quantity, category } = req.body;

          const product = new Product({
            name: name,
            slug: slugify(name),
            price,
            description,
            quantity,
            img: req.file.filename,
            createdBy: req.user._id,
            updatedBy: req.user._id,
            category,
          });

          try {
            product.save((err, pro) => {
              if (err) {
                return res.json({
                  msg: 'some field missing, Make sure you provide the required details ',
                });
              } else {
                if (pro) {
                  return res.status(200).json({ pro });
                }
              }
            });
          } catch (err) {
            return;
          }
        } catch (err) {
          return;
        }
      }
    });
  } catch (err) {
    console.log('err from 1');
    return;
  }
};

export const getProducts = (req, res) => {
  Product.find({}).exec((err, products) => {
    if (err) return res.status(400).json({ message: err.message });
    //else continue
    if (products) {
      return res.status(201).json({ products });
    }
  });
};
