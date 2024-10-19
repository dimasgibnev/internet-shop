import { useState } from 'react';

import styles from './ProductInfo.module.sass';


export const ProductInfo = ({ product }) => {
	const [activeImage, setActiveImage] = useState(0);

	if (!product) return null;

	const specs = product.specs.split('\n').map((item) => item.split(': '));

	return (
		<div className={styles.info}>
			<div className={styles.images}>
				<img src={product.images[activeImage].url} alt={product.title} />
				<div className={styles.mini}>
					{product.images.map((image, i) => (
						<img
							onClick={() => setActiveImage(i)}
							key={image.url}
							src={image.url}
							alt={product.title}
						/>
					))}
				</div>
			</div>
			<div className={styles.specs}>
				{specs.map((spec, i) => (
					<div key={i} className={styles.spec}>
						<h3>{spec[0]}</h3>
						<p>{spec[1]}</p>
					</div>
				))}
			</div>
		</div>
	);
};
