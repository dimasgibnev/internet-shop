import React, { useEffect, useState } from 'react';

import { slides } from '../../../assets/slides.ts';

import styles from '../About.module.sass';
import { Dots } from '../../../components/index.js';

export const Slider = () => {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (active === 5) {
				setActive(0);
			} else setActive(active + 1);
		}, 5000);

		setInterval(interval);

		return () => clearInterval(interval);
	}, [active]);

	const handleSetActive = (index) => {
		setActive(index);
	};

	return (
		<div className={styles.slider}>
			<div className={styles.title}>
				<h2>Ранние Годы</h2>
			</div>
			{slides.map(({ first, second, third }, index) => (
				<div
					key={index}
					className={active === index ? styles.active : styles.hidden}
				>
					<img className={styles.img} src={`/img/about/slider/${first}`} alt="" />
					<img className={styles.img} src={`/img/about/slider/${second}`} alt="" />
					<img className={styles.img} src={`/img/about/slider/${third}`} alt="" />
				</div>
			))}
			<Dots items={slides} active={active} handleSetActive={handleSetActive} />
		</div>
	);
};
