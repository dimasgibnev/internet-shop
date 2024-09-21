import React from 'react';
import { useParams } from 'react-router-dom';

export const Products = () => {
	const params = useParams();
	console.log(params);

	return <div>Products</div>;
};
