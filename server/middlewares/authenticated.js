import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

export const authenticated = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Пользователь не авторизован",
    });
  }

  const data = jwt.verify(token, "secret123");

  const user = await UserModel.findOne(data.id);

  if (!user) {
    return res.status(401).json({
      message: "Пользователь не найден",
    });
  }

  req.user = user;

  next();
};
