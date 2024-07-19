/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { MyButton } from '../../myButton/MyButton';
import { Logo } from './Logo';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const SearchPanel = styled.input`
	width: 570px;
	height: 50px;
	margin-right: 10px;
	border-radius: 5px;
	border: 2px solid rgba(5, 13, 167, 0.527);
	box-shadow: 4px 4px 2px 1px rgba(0, 0, 255, 0.2);
	background-color: #fff;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<Logo />
			<SearchPanel />
			<MyButton margin="0 10px 0 0" onClick={() => navigate('/cart')}>
				Корзина
			</MyButton>
			<MyButton margin="0 10px 0 0" onClick={() => navigate('/favourite')}>
				Избранное
			</MyButton>
			<MyButton margin="0 10px 0 0" onClick={() => navigate('/profile')}>
				Личный кабинет
			</MyButton>
			<MyButton margin="0 10px 0 0" onClick={() => navigate('/login')}>
				Войти
			</MyButton>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	width: 1300 px;
	height: 65px;
	padding: 10px;
	margin-bottom: 10px;
`;
