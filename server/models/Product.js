import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    images: [
      {
        url: String,
        title: String,
      },
    ],
    cordless: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    line: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    specs: {
      type: String,
      required: true,
    },
    reviews: [
      {
        star: Number,
        comment: {
          type: String,
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          
        },
        createdAt: Date,
      },
    ],
    totalRating: {
      type: String,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Product", ProductSchema);
