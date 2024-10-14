export const mapOrder = (order) => {
  return {
    _id: order._id,
    products: order.products.map((item) => item.product),
    createdAt: order.createdAt,
    orderby: order.orderby,
    status: order.status,
    totalPrice: order.totalPrice,
  };
};
