import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { mapUser } from "../helpers/mapUser.js";
import { generate, generateRefreshToken, verify } from "../utils/token.js";
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
    handleError(res, "Ошибка сервера, попробуйте снова");
    console.log(error);
  }
}

export async function login(req, res) {
  try {
    const {
      authData: { email, password },
      cart,
      wishlist,
    } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      handleError(res, "Почта или пароль неверны", 400);
    }

    const isMatch = bcrypt.compare(password, user?.password);

    if (!isMatch) {
      handleError(res, "Почта или пароль неверны", 400);
    }

    const accessToken = generate({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    let updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        refreshToken,
      },
      {
        new: true,
      }
    );

    if (cart.length > 0) {
      let filtredCart = [];

      if (user.cart.length > 0) {
        const diffProducts = user.cart.filter(
          (item) => !cart.some((cartItem) => cartItem.product === item.product)
        );

        if (diffProducts.length > 0) {
          filtredCart.push(...diffProducts);
        }
      }

      const finalCart = filtredCart.length > 0 ? filtredCart : cart;

      updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          cart: finalCart,
        },
        {
          new: true,
        }
      );
    }

    if (wishlist.length > 0) {
      let filtredWishlist = [];

      if (user.wishList.length > 0) {
        const diffWishes = user.wishList.filter(
          (item) => !wishlist.some((wishItem) => item.product === wishItem.product)
        );

        if (diffWishes.length > 0) {
          filtredWishlist.push(...diffWishes);
        }
      }
      const finalWishes =
        filtredWishlist.length > 0 ? filtredWishlist : wishlist;

      updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          wishList: finalWishes,
        },
        {
          new: true,
        }
      );
    }

    res.cookie("refreshToken", updatedUser.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const User = await UserModel.findById(user._id)
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
    handleError(res, "Ошибка сервера, попробуйте снова");
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

    res.json({ user: mapUser(updatedUser) });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
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
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json({ users: users.map(mapUser) });
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

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);

    await UserModel.findByIdAndDelete(id);

    res.json({ error: null, message: "Пользователь был удален" });
  } catch (error) {
    console.log(error);
    handleError(res, "Ошибка сервера, попробуйте снова");
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
    handleError(res, "Ошибка сервера, попробуйте снова");
  }
};
