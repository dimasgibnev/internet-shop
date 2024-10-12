import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Banner } from './banner/Banner';
import { Skeleton } from './banner/Skeleton';
import { banners } from '../../../data/banners';
import { Dots } from '../../../components/ui';

import styles from '../Home.module.sass';

export const Banners = () => {
	const [active, setActive] = useState(0);
	const isLoading = useSelector((state) => state.products.isLoading);

	useEffect(() => {
		const interval = setInterval(() => {
			if (active === 3) {
				setActive(0);
			} else setActive(active + 1);
		}, 10000);
		setInterval(interval);

		return () => clearInterval(interval);
	}, [active]);

	const handleSetActive = (index) => {
		setActive(index);
	};

	return (
		<div className={styles.banners}>
			{!isLoading ? (
				<>
					{banners.map((banner, index) => (
						<Banner
							className={active === index ? styles.active : styles.hidden}
							key={banner.model}
							banner={banner}
						/>
					))}
					<Dots
						active={active}
						items={banners}
						handleSetActive={handleSetActive}
						className={'banner-dots'}
					/>
				</>
			) : (
				<Skeleton />
			)}
		</div>
	);
};
