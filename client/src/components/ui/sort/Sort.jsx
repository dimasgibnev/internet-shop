import React, { useState } from 'react';
import { Icon } from '../icon/Icon';
import styles from './Sort.module.sass'
export const Sort = () => {
	const [active, setActive] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const list = [
		{ name: 'популярности', sort: 'totalRating' },
		{ name: 'цене', sort: 'price' },
		{ name: 'алфавиту', sort: 'title' },
	];
	return (
		<div>
			<div>
				<span>сортировка по-{list[active].name}</span>
				{isOpen ? <Icon icon="chevron-up" weight="solid"  /> : <Icon icon="chevron-down" weight="solid"  />}
			</div>
			<div className={isOpen ? styles.open : styles.closed}>
				<ul>
					{list.map((obj, i) => {
						return (
							<li key={i} onClick={() => setActive(i)}>
								по-{obj.name}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
