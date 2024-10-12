import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";
import {
  createOrder,
  deleteProduct,
  getAllOrders,
  getOrders,
  createCart,
} from "../controllers/cart.js";

export const router = express.Router({ mergeParams: true });

router.post("/", authenticated, createCart);
router.delete("/:id", authenticated, deleteProduct);
router.post("/order", authenticated, createOrder);
router.get("/orders", authenticated, getOrders);
router.get(
  "/getallorders",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  getAllOrders
);
router.post(
  "/getorderbyuser/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  getAllOrders
);
