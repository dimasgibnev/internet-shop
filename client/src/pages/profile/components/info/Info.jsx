import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { Icon, Input } from '../../../../components/ui';

import { saveAdress, selectUser } from '../../../../store/slices/userSlice';

import styles from '../dashboard/Dashboard.module.sass';

export const Info = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [isEdit, setIsEdit] = useState(false);
	const [adress, setAdress] = useState(user.adress || '');

	const handleEdit = () => {
		setIsEdit(!isEdit);
	};

	const handleSubmit = () => {
		setIsEdit(!isEdit);
		dispatch(saveAdress({ adress }));
	};
	return (
		<div className={styles.info}>
			<label>
				<span>Имя:</span>
				<Input disabled={true} value={user.firstName} />
			</label>
			<label htmlFor="">
				<span>Фамилия:</span>
				<Input disabled={true} value={user.lastName} />
			</label>
			<label htmlFor="">
				<span>Телефон:</span>
				<Input disabled={true} value={user.mobile} />
			</label>
			<label htmlFor="">
				<span>Email:</span>
				<Input disabled={true} value={user.email} />
			</label>
			<label>
				<span>Город:</span>
				<Input
					disabled={!isEdit}
					value={adress}
					onChange={(e) => setAdress(e.target.value)}
				/>
				{!isEdit ? (
					<Icon
						icon={'pen-to-square'}
						className={styles.edit}
						weight={'regular'}
						onClick={handleEdit}
					/>
				) : (
					<Icon
						icon={'check'}
						className={styles.edit}
						weight={'solid'}
						onClick={handleSubmit}
					/>
				)}
			</label>
		</div>
	);
};
