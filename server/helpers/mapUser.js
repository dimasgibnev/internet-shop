export const mapUser = (user) => {
	return {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		mobile: user.mobile,
		roleId: user.roleId,
		registeredAt: user.createdAt,
		cart: user.cart,
		wishList: user.wishList,
		adress: user.adress,
		orders: user.orders
	}
}