import { ProductModel } from "../models/Product.js";

export const addProduct = async (post) => {
  const newProduct = await ProductModel.create(post);

  await newProduct.populate({ path: "description", populate: "author" });

  return newProduct;
};

export const editProduct = async (id, post) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  });

  await updatedProduct.populate({ path: "description", populate: "author" });

  return updatedProduct;
};

export const deleteProduct = (id) => {
  return ProductModel.findByIdAndDelete(id);
};

export const getProducts = async (search = "", page = 1, limit = 10) => {
  const [products, count] = await Promise.all([
    ProductModel.find({ name: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    ProductModel.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
};

export const getProduct = (id) => {
  return ProductModel.findById(id).populate({
    path: "desription",
    populate: "author",
  });
};
