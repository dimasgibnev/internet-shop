import express from "express";
import { router as auth } from "./auth.js";
import { router as products } from "./product.js";
import { router as user } from "./user.js";
import { router as category } from "./category.js";
import { router as cart } from "./cart.js";
import { router as review } from "./review.js";

export const router = express.Router({ mergeParams: true });

router.use("/", auth);
router.use("/products", products);
router.use("/users", user);
router.use("/categories", category);
router.use("/cart", cart);
router.use("/review", review);
