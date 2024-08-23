import { LineModel } from "../models/Line.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export const getAllLine = async (req, res) => {
  try {
    const lines = await LineModel.find();

    if (!lines) {
      res.status(404).json({ error: "Линейки не найдены" });
    }
    
    res.json({ data: lines });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getLine = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const findLine = await LineModel.findById(id);

    if (!findLine) {
      res.status(404).json({ error: "Линейка не найдена" });
    }

    res.json({ data: findLine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createLine = async (req, res) => {
  try {
    const newLine = await LineModel.create(req.body);

    res.json({ data: newLine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateLine = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const updatedLine = await LineModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedLine) {
      throw new Error("Линейка не найдена");
    }

    res.json({ data: updatedLine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteLine = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deletedLine = await LineModel.findByIdAndDelete(id);

    if (!deletedLine) {
        throw new Error("Линейка не найдена");
    }

    res.json({ message: "Линейка была удалена", data: deletedLine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
