import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";
import { mapUser } from "../helpers/mapUser.js";
import { generate, generateRefreshToken, verify } from "../utils/token.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import { CartModel } from "../models/Cart.js";
import { ProductModel } from "../models/Product.js";

export async function register(req, res) {
  try {
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
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
      user: mapUser(updatedUser),
      accessToken,
      refreshToken
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

    res.send({ user: mapUser(user) });
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

export const userCart = async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await UserModel.findById(_id);
    const alreadyExistCart = await CartModel.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await ProductModel.findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new CartModel({
      products,
      cartTotal,
      orderby: user._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ошибка при добавлении в корзину");
  }
};

export const getUserCart = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await CartModel.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Не удалось загрузить продукты из корзины");
  }
};

export const emptyCart = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await UserModel.findOne({ _id });
    const cart = await CartModel.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (req, res) => {
  const { COD } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Не выбран способ оплаты");
    const user = await UserModel.findById(_id);
    let userCart = await CartModel.findOne({ orderby: user._id });
    const finalAmout = userCart.cartTotal;

    await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "rub",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    const update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    console.log(error);
  }
};
