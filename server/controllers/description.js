import { DescriptionModel } from "../models/Description.js";
import { ProductModel } from "../models/Product.js";

export const addDescription = async (postId, description) => {
  const newDescription = await DescriptionModel.create(description);

  await ProductModel.findByIdAndUpdate(postId, {
    $push: { descriptions: newDescription },
  });

  await newDescription.populate("author");

  return newDescription;
};

export const deleteDescription = async (postId, descriptionId) => {
  await DescriptionModel.findByIdAndDelete(descriptionId);

  await ProductModel.findByIdAndUpdate(productId, {
    $pull: { descriptions: descriptionId },
  });
};
