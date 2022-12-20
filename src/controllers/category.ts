import Category from '../models/category.js';
import slugify from 'slugify';

const createCategortList = (categories, parentId) => {
  const categoryList = [];
  let category = [];
  if (parentId === null) {
    for (let cat of categories) {
      if (cat.parentId == '') {
        category.push(cat);
      }
    }
  } else {
    for (let cat of categories) {
      if (cat.parentId == parentId) {
        category.push(cat);
      }
    }
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategortList(categories, cate._id),
    });
  }
  return categoryList;
};

export const createCategory = (req, res) => {
  if (!req.body.name || req.body.name === '') {
    return res.status(400).json({ message: 'Category name cannot be empty' });
  } else {
    Category.findOne({ name: req.body.name }).exec((err, cat) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      //else continue
      if (cat)
        return res.status(201).json({ message: 'Category already exists' });
      //else continue
      try {
        const category = new Category({
          name: req.body.name,
          slug: slugify(req.body.name),
          parentId: req.body.parentId ? req.body.parentId : '',
          img: req.file.filename,
        });
        category.save((err, cat) => {
          if (err) {
            return res.status(400).json({ message: err.message });
          }
          if (cat) {
            return res.status(201).json({ cat });
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  //else continue
};

export const getCategoriesList = (req, res) => {
  Category.find({}).exec((err, Categories) => {
    if (err) return res.status(400).json({ message: err.message });
    //else continue
    if (Categories) {
      const categoryList = createCategortList(Categories, null);
      return res.status(201).json({ categoryList });
    }
  });
};

export const getCategoriesName = (req, res) => {
  Category.find({})
    .select('name')
    .exec((err, Categories) => {
      if (err) return res.status(400).json({ message: err.message });
      //else continue
      if (Categories) {
        return res.status(201).json({ Categories });
      }
    });
};
export const getCategories = (req, res) => {
  Category.find({}).exec((err, Categories) => {
    if (err) return res.status(400).json({ message: err.message });
    //else continue
    if (Categories) {
      return res.status(201).json({ Categories });
    }
  });
};
