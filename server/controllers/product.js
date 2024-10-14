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

    const findProduct = await ProductModel.findById(id).populate({
      path: "reviews",
      populate: "postedBy",
    });
    const totalLength = findProduct.reviews.length;
    const lastPage = Math.ceil(totalLength / 2);

    res.json({ product: mapProduct(findProduct), lastPage });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const getProducts = async (req, res) => {
  try {
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
          $pull: { wishList },
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
    const alreadyRated = product.reviews.find(
      ({ postedBy }) => postedBy.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await ProductModel.updateOne(
        {
          reviews: { $elemMatch: alreadyRated },
        },
        {
          $set: { "reviews.$.star": star, "reviews.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          $push: {
            reviews: {
              star,
              postedBy: _id,
              comment: comment,
              createdAt: Date.now(),
            },
          },
        },
        { new: true }
      );
    }
    const getAllreviews = await ProductModel.findById(productId);
    const totalRating = getAllreviews.reviews.length;
    const reviewsum = getAllreviews.reviews
      .map((item) => item.star)
      .reduce((acc, star) => acc + star, 0);
    const actualRating = Math.round(reviewsum / totalRating);

    const updatedRatingProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        totalRating: actualRating,
      },
      { new: true }
    ).populate({
      path: "reviews",
      populate: "postedBy",
    });

    res.json({ reviews: updatedRatingProduct.reviews });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};
