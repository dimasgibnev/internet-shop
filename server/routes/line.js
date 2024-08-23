import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";
import {
  createLine,
  deleteLine,
  getAllLine,
  getLine,
  updateLine,
} from "../controllers/line.js";

export const router = express.Router({ mergeParams: true });

router.get("/", getAllLine);
router.get("/:id", getLine);
router.post("/", authenticated, checkHasRole([ROLES.ADMIN]), createLine);
router.put("/:id", authenticated, checkHasRole([ROLES.ADMIN]), updateLine);
router.delete(
  "/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  deleteLine
);
