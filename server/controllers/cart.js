import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import { OrderModel } from "../models/Order.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export const createCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);

    const product = await ProductModel.findById(productId);

    const cart = {
      product: product._id,
      count: 1,
    };

    const user = await UserModel.findByIdAndUpdate(
      _id,
      {
        $push: { cart },
      },
      { new: true }
    ).populate({
      path: "cart",
      populate: "product",
    });

    res.json({ cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ошибка при добавлении в корзину");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id: productId } = req.params;

    if (productId === "clear") {
      const user = await UserModel.findOneAndUpdate(
        _id,
        {
          $set: { cart: [] },
        },
        { new: true }
      );
      res.status(200).json({ cart: user.cart });
    }

    const user = await UserModel.findOneAndUpdate(
      _id,
      {
        $pull: { cart: { product: productId } },
      },
      { new: true }
    );
    res.json({ cart: user.cart });
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (req, res) => {
  const { products } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const user = await UserModel.findById(_id);

    const order = await new OrderModel({
      products,
      orderby: user._id,
    }).save();

    await UserModel.findByIdAndUpdate(
      _id,
      {
        $set: { cart: [] },
        $push: { orders: order._id },
      },
      { new: true }
    );

    await order.populate({ path: "products", populate: "product" });

    res.json({ order });
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await OrderModel.find({ orderby: _id })
      .populate({ path: "products", populate: "product" })
      .exec();
    res.json({ orders: userorders });
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
