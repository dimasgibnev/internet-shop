import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";
import {
  createOrder,
  deleteProduct,
  getAllOrders,
  getOrders,
  updateOrderStatus,
  userCart,
} from "../controllers/cart.js";

export const router = express.Router({ mergeParams: true });

router.post("/", authenticated, userCart);
router.post("/cash-order", authenticated, createOrder);
router.get("/get-orders", authenticated, getOrders);
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
router.delete("/:id", authenticated, deleteProduct);
router.put(
    "/order/update-order/:id",
    authenticated,
    checkHasRole([ROLES.ADMIN]),
    updateOrderStatus
  );