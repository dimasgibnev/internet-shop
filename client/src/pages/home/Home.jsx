import { useSelector } from 'react-redux';
import { ProductCard } from '../../components';
import './Home.sass';

export const Home = () => {
	const products = useSelector((state) => state.product.data);
	return (
		<div className="home">
			<section className="section-banner section-banner">
				<div className="section-banner__wrapper">
					<img
						src="https://cdn.makitatools.com/apps/wms/slider/hero-august-slide2.jpg"
						alt=""
					/>
					<div className="section-banner__overlay"></div>
				</div>
			</section>
			<section className="section-products products">
				<h2 className="products__title">НОВИНКИ</h2>
				<div className="products__wrapper">
					{products &&
						products.slice(0, 3).map((product) => {
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
			</section>
		</div>
	);
};
