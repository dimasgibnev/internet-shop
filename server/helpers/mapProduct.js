export const mapProduct = (product) => {
	return {
		_id: product._id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        images: product.images,
        price: product.price,
        category: product.category,
        line: product.line,
        series: product.series,
        quantity: product.quantity,
        specs: product.specs,
        ratings: product.ratings,
        totalRating: product.totalRating
	}
}