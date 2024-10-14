import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import {
  createOrder,
  deleteProduct,
  getOrders,
  createCart,
  getOrder,
} from "../controllers/cart.js";

export const router = express.Router({ mergeParams: true });

router.post("/", authenticated, createCart);

router.delete("/:id", authenticated, deleteProduct);

router.post("/order", authenticated, createOrder);

router.get("/orders", authenticated, getOrders);

router.get("/orders/:id", authenticated, getOrder);
