import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
  getMe,
  handleRefreshToken,
} from "../controllers/user.js";
import { mapUser } from "../helpers/mapUser.js";
import * as ROLES from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.get("/", authenticated, checkHasRole([ROLES.ADMIN]), getUsers);

router.get("/me", authenticated, getMe);

router.get(
  "/roles",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    const roles = await getRoles();

    res.send({ data: roles });
  }
);

router.get("/refresh", handleRefreshToken);

router.patch("/:id", authenticated, checkHasRole([ROLES.ADMIN]), updateUser);



router.delete("/:id", authenticated, checkHasRole([ROLES.ADMIN]), deleteUser);
