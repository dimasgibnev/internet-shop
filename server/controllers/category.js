import { CategoryModel } from "../models/Category.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import { handleError } from "../utils/handleError.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return res.status(404).json({ error: "Категории не найдены" });
    }

    res.json({ data: categories });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await CategoryModel.create(req.body);

    res.json({ data: newCategory });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};