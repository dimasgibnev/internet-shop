import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components';
import { useSelector } from 'react-redux';
import './Products.sass';

export const Products = () => {
	const params = useParams();


	const products = useSelector((state) => state.product.data);

	return (
		<div className="products">
			<div className="container">
				{products &&
					products.map((product) => {
						return (
							<ProductCard
								key={product._id}
								id={product._id}
								image={product.mainImage}
								title={product.title}
								model={product.series}
								price={product.price}
							/>
						);
					})}
			</div>
		</div>
	);
};
