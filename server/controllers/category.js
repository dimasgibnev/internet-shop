import { CategoryModel } from "../models/Category.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return res.status(404).json({ error: "Категории не найдены" });
    }
    
    res.json({ data: categories });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова")
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const findCategory = await CategoryModel.findById(id);

    if (!findCategory) {
      return res.status(404).json({ error: "Категория не найдена" });
    }

    res.json({ data: findCategory });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова")
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await CategoryModel.create(req.body);

    res.json({ data: newCategory });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова")
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
        return res.status(404).json({ error: "Категория не найдена" });
      }

    res.json({ data: updatedCategory });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова")
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
        return res.status(404).json({ error: "Категория не найдена" });
      }

    res.json({ message: "Категория была удалена", data: deletedCategory });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова")
  }
};
