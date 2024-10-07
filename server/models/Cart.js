import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        orderedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      },
    ]
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model("Cart", cartSchema);
