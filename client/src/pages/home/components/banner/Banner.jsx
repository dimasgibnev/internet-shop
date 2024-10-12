import { Link } from 'react-router-dom';

import { Button } from '../../../../components/ui';

import styles from './Banner.module.sass';

export const Banner = ({ banner, className }) => {

	return (
		<section className={styles.banner + ' ' + className}>
			<div className={styles['banner__wrapper']}>
				<img src={`/img/banners/${banner.image}`} alt={banner.title} />
				<div
					className={
						styles['banner__overlay'] + ' ' + styles[`${banner.style}`]
					}
				>
					<div className={styles['banner__info']}>
						<h1 className={styles['banner__title']}>{banner.title}</h1>
						<p className={styles['banner__model']}>{banner.model}</p>
					</div>
					<Link to={`/products/details/${banner.link}`}>
						<Button className={styles['banner__btn']}>ПОДРОБНЕЕ</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};
