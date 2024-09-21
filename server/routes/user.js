import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import {
  getUsers,
  updateUser,
  deleteUser,
  getMe,
  saveAddress
} from "../controllers/user.js";
import * as ROLES from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.get("/", authenticated, checkHasRole([ROLES.ADMIN]), getUsers);
router.get("/me", authenticated, getMe);
router.put("/save-address", authenticated, saveAddress);
router.patch("/:id", authenticated, checkHasRole([ROLES.ADMIN]), updateUser);
router.delete("/:id", authenticated, checkHasRole([ROLES.ADMIN]), deleteUser);
