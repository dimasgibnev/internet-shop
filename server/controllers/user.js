import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { mapUser } from "../helpers/mapUser.js";
import { generate, verify } from "../utils/token.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import { handleError } from "../utils/handleError.js";

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

    res.json({ user: mapUser(newUser), accessToken });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Пользователь с таким email или телефоном уже существует",
      });
    }
    handleError(res, "Ошибка сервера, попробуйте снова");
    console.log(error);
  }
}

export async function login(req, res) {
  try {
    const { email, password, cart, wishList } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    const accessToken = generate({ _id: user._id });

    if (cart) {
      const filtred = cart.filter((item) => !user.cart.some(({ _id }) => _id === item._id));

      user.cart = [...user.cart, ...filtred];
    }

    if (wishList) {
      const filtred = wishList.filter((item) => !user.wishList.some(({ _id }) => _id === item._id));

      user.wishList = [...user.wishList, ...filtred];
    }

    const User = await UserModel.findByIdAndUpdate(user._id, {
      $set: { cart: user.cart, wishList: user.wishList },
    })
      .populate({
        path: "wishList",
        populate: "product",
      })
      .populate({ path: "cart", populate: "product" })
      .exec();

    res.json({
      user: mapUser(User),
      accessToken,
    });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
}

export const saveAddress = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        adress: req.body.adress,
      },
      {
        new: true,
      }
    );

    res.json({ user: mapUser(updatedUser) });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const getMe = async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDbId(_id);

    const user = await UserModel.findById(_id)
      .populate({
        path: "wishList",
        populate: "product",
      })
      .populate({ path: "cart", populate: "product" })
      .exec();

    res.send({ user: mapUser(user) });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};
