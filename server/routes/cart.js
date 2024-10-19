import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import {
  createOrder,
  deleteProduct,
  getOrders,
  createCart,
  getOrder,
  deleteOrder,
} from "../controllers/cart.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.post("/", authenticated, createCart);

router.delete("/:id", authenticated, deleteProduct);

router.post("/order", authenticated, createOrder);

router.get("/orders", authenticated, getOrders);

router.get("/orders/:id", authenticated, getOrder);

router.delete(
  "/orders/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  deleteOrder
);
