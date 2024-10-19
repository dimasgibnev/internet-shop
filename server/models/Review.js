import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    star: Number,
    comment: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Review", reviewSchema);
