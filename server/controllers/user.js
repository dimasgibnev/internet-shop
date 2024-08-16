import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { mapUser } from "../helpers/mapUser.js";
import { generate, generateRefreshToken, verify } from "../utils/token.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import jwt from "jsonwebtoken";
import * as ROLES from "../constants/roles.js";

export async function register(req, res) {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({ ...req.body, password });
    const token = generate({ _id: newUser._id });

    res.json({ user: mapUser(newUser), token });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Такой пользователь уже существует",
      });
    }
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться, попробуйте снова",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Почта или пароль неверны",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Почта или пароль неверны",
      });
    }

    const accessToken = generate({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", updatedUser.refreshToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({
      user: mapUser(user),
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось войти, попробуйте снова",
    });
  }
}

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error("Токен отсутствует в cookie");
    }

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });

      return res.sendStatus(204);
    }
    await UserModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

export const handleRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error("Токен отсутствует в cookie");
    }

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      throw new Error("Токен отсутствует в базе данных");
    }

    const data = verify(refreshToken);

    if (data._id !== user._id.toString()) {
      throw new Error("Токен не валиден");
    }

    const accessToken = generate({ _id: user._id });

    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить данные",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json({ data: users.map(mapUser) });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить данные",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDbId(_id);

    const user = await UserModel.findById(_id);

    res.send({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить данные",
    });
  }
};

export const getRoles = async () => {
  const roles = [
    { id: ROLES.ADMIN, name: "admin" },
    { id: ROLES.USER, name: "user" },
  ];

  return roles;
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);

    await UserModel.findByIdAndDelete(id);

    res.json({ error: null, message: "Пользователь был удален" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить пользователя",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        email: req.body?.email,
        mobile: req.body?.mobile,
        roleId: req.body?.roleId,
      },
      {
        returnDocument: "after",
      }
    );

    res.json({ data: mapUser(updatedUser), message: "Пользователь обновлен" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить пользователя",
    });
  }
};
