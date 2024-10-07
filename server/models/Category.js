import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: String,
    childCategories: [
      {
        type: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const CategoryModel = mongoose.model("Category", categorySchema);
