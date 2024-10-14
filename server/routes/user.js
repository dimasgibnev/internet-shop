import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import {
  getMe,
  saveAddress
} from "../controllers/user.js";

export const router = express.Router({ mergeParams: true });

router.get("/me", authenticated, getMe);

router.put("/save-address", authenticated, saveAddress);
