import { mapProduct } from "../helpers/mapProduct.js";
import { ProductModel } from "../models/Product.js";
import { ReviewModel } from "../models/Review.js";
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
    const filter = req.filter;
    const sort = req.sort;
    const skip = req.skip;
    const limit = req.limit;

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
