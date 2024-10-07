export const calculateOrder = (order) => {
	let productCount = 0;
	let totalPrice = 0;
	
	order.forEach(({product, count}) => {
		if ( product.quantity > 0) {
			productCount += count;
			totalPrice += product.price * count;
		}
	});

	return {
		count: productCount,
		price: totalPrice
	}
}