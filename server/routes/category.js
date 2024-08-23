import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.js";

export const router = express.Router({ mergeParams: true });

router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.post("/", authenticated, checkHasRole([ROLES.ADMIN]), createCategory);
router.put("/:id", authenticated, checkHasRole([ROLES.ADMIN]), updateCategory);
router.delete(
  "/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  deleteCategory
);
