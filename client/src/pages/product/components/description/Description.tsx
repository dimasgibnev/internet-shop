import { FC, PropsWithChildren, useState } from 'react';

import { Icon } from '../../../../components/ui/icon/Icon';
import { IProduct } from '../../../../interface/product.interface';

import styles from './Description.module.sass';

type Props = {
	product: IProduct;
};

export const Description: FC<PropsWithChildren<Props>> = ({ product }) => {
	const [activeDesc, setActiveDesc] = useState<boolean>(false);

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
