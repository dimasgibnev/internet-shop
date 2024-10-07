import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export const userCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    const product = await ProductModel.findById(productId);

    await UserModel.findByIdAndUpdate(
      _id,
      {
        $push: { cart: { product: productId, count: 1, price: product.price } },
      },
      { new: true }
    );

    const user = await UserModel.findById(_id);

    res.json({ data: user.cart });
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

export const deleteProduct = async (req, res) => {
  try {
    
			
    const { _id } = req.user;
    const { id: productId } = req.params;
    const user = await UserModel.findOneAndUpdate(
      _id,
      {
        $pull: { cart: { product: productId} },
      },
      { new: true }
    );
    res.json(user.cart);
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
