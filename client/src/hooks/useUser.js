import { useSelector } from 'react-redux';

export const useUser = () => {
	const user = useSelector((state) => state.user.data);

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
