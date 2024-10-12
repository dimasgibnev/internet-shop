import {  useAppSelector } from '../../../../hooks/hooks';
import { selectOrders } from '../../../../store/slices/orderSlice';
import styles from '../dashboard/Dashboard.module.sass';
export const Orders = () => {
	const orders = useAppSelector(selectOrders);
	console.log(orders);

	return (
		<div className={styles.orders}>

		</div>
	);
};
