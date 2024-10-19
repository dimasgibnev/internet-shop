import { useState } from 'react';

import { Icon } from '../../../../components/ui/icon/Icon';

import styles from './Description.module.sass';


export const Description = ({ product }) => {
	const [activeDesc, setActiveDesc] = useState(false);

	return (
		<div className={styles.desc}>
			<Icon
				className={styles['desc-icon']}
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
	);
};
