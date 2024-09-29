import { useSelector } from 'react-redux';
import { userSelector } from '../store/authSlice';

export const useUser = () => {
	const user = useSelector(userSelector);

	const getUserName = (method) => {
		switch (method) {
			case 'short':
				return (
					user.firstName.slice(0, 1) + '. ' + user.lastName.slice(0, 1) + '.'
				);
			default:
				return user.firstName + ' ' + user.lastName;
		}
	};

	return { getUserName, user };
};
