import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.js";

export const router = express.Router({ mergeParams: true });

router.get("/", getAllCategory);

router.post("/", authenticated, checkHasRole([ROLES.ADMIN]), createCategory);
