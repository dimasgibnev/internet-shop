import { UserModel } from "../models/User.js";
import "dotenv/config";
import { verify } from "../utils/token.js";

export const authenticated = async (req, res, next) => {
  if (!req.headers?.authorization) {
    return res.status(401).json({
      message: "Пользователь не авторизован",
    });
  }

  const token = req.headers.authorization.replace("Bearer ", "");


  try {
    const data = verify(token);
    
    const user = await UserModel.findById(data._id);

    if (!user) {
      return res.status(401).json({
        message: "Пользователь не найден",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({
      message: "Истекло время жизни токена, авторизуйтесь снова",
    });
  }
};
