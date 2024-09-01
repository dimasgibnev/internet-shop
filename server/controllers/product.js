import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const newProduct = await ProductModel.create(req.body);

    res.json({ data: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить данные, попробуйте снова",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    validateMongoDbId(id);

    const findProduct = await ProductModel.findById(id);

    res.json({ data: findProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить данные, попробуйте снова",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const exludeFields = ["sort", "page", "limit", "fields"];
    exludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = ProductModel.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("category");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numProducts = await ProductModel.countDocuments();
      if (skip >= numProducts) throw new Error("Такой страницы не существует");
    }

    const products = await query;

    res.json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
    res.status(500).json({
      message: "Не удалось удалить товар, попробуйте снова",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const { id } = req.params;
    const newProductData = req.body;

    validateMongoDbId(id);

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
    res.status(500).json({
      message: "Не удалось отправить данные, попробуйте снова",
    });
  }
};

export const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  validateMongoDbId(_id);
  validateMongoDbId(productId);
  try {
    const user = await UserModel.findById(_id);

    const alreadyAdded = user.wishList.find(
      (id) => id.toString() === productId
    );

    if (!alreadyAdded) {
      const user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: productId },
        },
        { new: true }
      );
      res.json({ user });
    } else {
      const user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: productId },
        },
        { new: true }
      );
      res.json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка сервера, попробуйте снова",
    });
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
          $set: { "ratings.$.star": star, "ratings.$.comment": comment},
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
    res.status(500).json({
      message: "Ошибка сервера, попробуйте снова",
    });
  }
};
