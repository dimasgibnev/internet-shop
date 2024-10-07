import jwt from "jsonwebtoken";
import "dotenv/config";

const sign = process.env.JWT_SECRET;

export const generate = (data) => {
  return  jwt.sign(data, sign, { expiresIn: "15d" })
};

export const verify = (token) => {
  return jwt.verify(token, sign);
};

export const generateRefreshToken = (data) => {
  return  jwt.sign(data, sign, { expiresIn: "30d" })
};
