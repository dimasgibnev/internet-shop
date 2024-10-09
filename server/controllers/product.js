import { mapProduct } from "../helpers/mapProduct.js";
import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import { handleError } from "../utils/handleError.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const newProduct = await ProductModel.create(req.body);

    res.json({ data: newProduct });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    validateMongoDbId(id);

    const findProduct = await ProductModel.findById(id);

    res.json({ product: mapProduct(findProduct) });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const getProducts = async (req, res) => {
  try {
    console.log(req.query);

    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.line) {
      filter.line = { $in: req.query.line };
    }

    if (req.query.category) {
      filter.category = { $in: req.query.category };
    }

    if (req.query.sort) {
      sort[req.query.sort] = req.query.order
        ? req.query.order === "desc"
          ? -1
          : 1
        : 1;
    }

    if (req.query.search) {
      filter["$or"] = [{ title: { $regex: req.query.search, $options: "i" } }];
    }

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const productsCount = await ProductModel.countDocuments(filter);
    const products = await ProductModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({ products: products.map(mapProduct), count: productsCount });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    validateMongoDbId(id);

    await ProductModel.findByIdAndDelete(id);

    res.json({ error: null, message: "Товар был удален" });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const { id } = req.params;
    validateMongoDbId(id);
    const newProductData = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      newProductData,
      {
        returnDocument: "after",
      }
    );

    res.json({ data: updatedProduct });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  validateMongoDbId(_id);
  validateMongoDbId(productId);

  try {
    const user = await UserModel.findById(_id);
    const product = await ProductModel.findById(productId);

    const alreadyAdded = user.wishList.some(
      ({ product }) => product._id.toString() === productId
    );

    const wishList = { product: product._id };

    if (!alreadyAdded) {
      const user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $push: { wishList },
        },
        { new: true }
      ).populate({
        path: "wishList",
        populate: "product",
      });

      res.json({ wishList: user.wishList });
    } else {
      const user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList},
        },
        { new: true }
      ).populate({
        path: "wishList",
        populate: "product",
      });

      res.json({ wishList: user.wishList });
    }
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const getRating = async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  try {
    const product = await ProductModel.findById(productId);
    const alreadyRated = product.ratings.find(
      ({ postedBy }) => postedBy.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await ProductModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $push: { ratings: { star, postedBy: _id, comment: comment } },
        },
        { new: true }
      );
    }
    const getAllRatings = await ProductModel.findById(productId);
    const totalRating = getAllRatings.ratings.length;
    const ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((acc, star) => acc + star, 0);
    const actualRating = Math.round(ratingSum / totalRating);

    const updatedRatingProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );

    res.json({ data: updatedRatingProduct });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};
