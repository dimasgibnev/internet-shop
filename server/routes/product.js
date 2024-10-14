import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  addToWishlist,
  getRating,
} from "../controllers/product.js";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.post("/", authenticated, checkHasRole([ROLES.ADMIN]), createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/wishlist", authenticated, addToWishlist);

router.put("/rating", authenticated, getRating);