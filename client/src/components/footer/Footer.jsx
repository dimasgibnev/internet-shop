import { Link } from 'react-router-dom';

import styles from './Footer.module.sass';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.links}>
					<div>
						<Link to={'/'}>
							<img src={'/img/footer-logo.jpg'} alt="makita logo" />
						</Link>
					</div>
					<div className={styles['links__wrapper']}>
						<span className={styles['links__title']}>Инструменты</span>
						<Link className={styles['links__item']} to={'/products/cordless'}>
							Аккумуляторные
						</Link>
						<Link className={styles['links__item']} to={'/products/corded'}>
							Сетевые
						</Link>
						<Link className={styles['links__item']} to={'/products/gas'}>
							Бензотехника
						</Link>
					</div>
					<div className={styles['links__wrapper']}>
						<span className={styles['links__title']}>Контакты</span>
						<Link to={'/about'} className={styles['links__item']}>
							О нас
						</Link>
					</div>
				</div>
				<div className={styles.copyright}>
					<span>{new Date().getFullYear()} Разработка Дмитрий Сгибнев</span>
				</div>
			</div>
		</footer>
	);
};
