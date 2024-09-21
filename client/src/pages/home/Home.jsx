import { ProductCard } from './components/ProductCard';
import './Home.sass';

export const Home = () => {
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
						<ProductCard
							image={
								'https://cdn.makitatools.com/apps/cms/img/ml0/27a22984-7da0-47bf-b10c-8cb2cfad1e4d_ml012g_p_500px.jpg?h=364&w=364&trim.padding=1'
							}
							model={'ML-012G'}
							title={'40V max XGT® L.E.D. Underhood Work Light'}
						/>

						<ProductCard
							image={
								'https://cdn.makitatools.com/apps/cms/img/gt5/aec0f51d-8de7-4220-9076-2958ffbca767_gt500m_k_500px.jpg?h=364&w=364&trim.padding=1'
							}
							model={'GT500M'}
							title={'40V max XGT® Brushless 5-Pc. Combo Kit'}
						/>

						<ProductCard
							image={
								'https://cdn.makitatools.com/apps/cms/img/gcu/2d38f480-263c-4018-91c0-3946fa35fec9_gcu04t1_k_500px.jpg?h=364&w=364&trim.padding=1'
							}
							model={'GCU04T1'}
							title={'40V max XGT® Brushless 18" Chain Saw Kit'}
						/>

						<ProductCard
							image={
								'https://cdn.makitatools.com/apps/cms/img/xux/1a9bcd20-339f-45d3-972e-1f119582e25c_xux02sm1x5_k_500px.jpg?h=364&w=364&trim.padding=1'
							}
							model={'XUX02SM1X5'}
							title={
								'18V LXT® Brushless Couple Shaft Power Head Kit w/ 3 Attachments'
							}
						/>
					</div>
				</section>
			</div>
	);
};
