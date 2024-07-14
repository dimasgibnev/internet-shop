/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { MyButton } from '../../myButton/MyButton';
import { Logo } from './Logo';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const SearchPanel = styled.input`
	width: 570px;
	height: 100%;
	margin-right: 10px;
	background-color: #fff;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<Logo />
			<SearchPanel />
			<MyButton onClick={() => navigate('/cart')}>Корзина</MyButton>
			<MyButton onClick={() => navigate('/favourite')}>Избранное</MyButton>
			<MyButton onClick={() => navigate('/profile')}>Личный кабинет</MyButton>
			<MyButton onClick={() => navigate('/login')}>Войти</MyButton>
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
