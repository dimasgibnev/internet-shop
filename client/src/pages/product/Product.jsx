import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchProduct } from '../../store/slices/productsSlice';
import { findImage } from '../../utils/findImage';

import styles from './product.module.sass';
import { Button, Scroll } from '../../components';
import { Icon } from '../../components/icon/Icon';

export const Product = () => {
	const dispatch = useDispatch();
	const [activeImage, setActiveImage] = useState(0);
	const [activeDesc, setActiveDesc] = useState(false);
	const params = useParams();
	const product = useSelector((state) => state.products.product);

	useEffect(() => {
		dispatch(fetchProduct(params.productId));
	}, [dispatch, params.productId]);

	if (!product) return null;

	const specs = product.specs.split('\\n').map((item) => item.split(': '));

	return (
		<div className={styles.product}>
			<div className={styles.title}>
				<span>{product.series}</span>
				<h2>{product.title}</h2>
			</div>
			<div className={styles['product-wrapper']}>
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
					<div className={styles.order}>
						<div className={styles.price}>
							<h3>{product.price} ₽</h3>
						</div>
						{product.quantity > 0 ? (
							<>
								<Button className={styles.btn}>ДОБАВИТЬ В КОРЗИНУ</Button>
								<p>В наличии на складе &gt; {product.quantity} шт.</p>
							</>
						) : (
							<>
								<Button className={styles['btn-disabled']}>
									Уведомить о наличии
								</Button>
								<p>Нет в наличии</p>
							</>
						)}
					</div>
				</div>
				<div className={styles.desc}>
					<Icon className={styles['desc-icon']}
						icon={activeDesc ? 'chevron-up' : 'chevron-down'}
						weight={'solid'}
						onClick={() => setActiveDesc(!activeDesc)}
					>
						{activeDesc ? 'Скрыть описание' : 'Показать описание'}
					</Icon>
					<h3>Описание</h3>
					<p>
						{activeDesc
							? product.description
							: product.description.slice(0, 310) + '...'}
					</p>
				</div>
			</div>
			<Scroll />
		</div>
	);
};
