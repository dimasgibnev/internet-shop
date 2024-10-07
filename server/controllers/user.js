import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { mapUser } from "../helpers/mapUser.js";
import { generate, generateRefreshToken, verify } from "../utils/token.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export async function register(req, res) {
  try {
    if (!req.body) {
      res.status(501).json({
        message: "Введите данные для регистрации",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({ ...req.body, password });
    const accessToken = generate({ _id: newUser._id });
    const refreshToken = generateRefreshToken({ _id: newUser._id });
    const updatedUser = await UserModel.findByIdAndUpdate(
      newUser._id,
      {
        refreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", updatedUser.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({ user: mapUser(updatedUser), accessToken, refreshToken });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Пользователь с таким email или телефоном уже существует",
      });
    }
    res.status(500).json({
      message: "Не удалось зарегистрироваться, попробуйте снова",
    });
    console.log(error);
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
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
      user: updatedUser,
      accessToken,
      refreshToken,
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

      return res.sendStatus(200);
    }

    await UserModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const saveAddress = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        address: req.body.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить адрес",
    });
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
    res.status(500).json({ error: error.message });
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

    res.send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить данные",
    });
  }
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

