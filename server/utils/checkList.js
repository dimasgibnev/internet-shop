export const checkList = async (list, user) => {
  if (list.length > 0) {
    let filtredList = [];

    if (user.cart.length > 0) {
      const diffProducts = user.cart.filter(
        (item) => !list.some((listItem) => listItem.product === item.product)
      );

      if (diffProducts.length > 0) {
        filtredList.push(...diffProducts);
      }
    }

    const finalList = filtredList.length > 0 ? filtredList : list;

    updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        cart: finalList,
      },
      {
        new: true,
      }
    );
  }
};
