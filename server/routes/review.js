import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import * as ROLES from "../constants/roles.js";
import { addReview, deleteReview, getReviews, updateReview } from "../controllers/review.js";

export const router = express.Router({ mergeParams: true });

router.get("/", getReviews);

router.post("/", authenticated, addReview);

router.patch("/:id", authenticated, updateReview);

router.delete("/:id", authenticated, checkHasRole([ROLES.ADMIN]), deleteReview);