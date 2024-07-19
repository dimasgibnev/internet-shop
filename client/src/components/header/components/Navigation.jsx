/* eslint-disable react/prop-types */

import styled from "styled-components";
import { MyButton } from "../../myButton/MyButton";
import { useNavigate } from "react-router";


const NavigationContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<MyButton margin='0 10px 0 0' width='400px' onClick={() => navigate('/catalog')}>Каталог</MyButton>
			<MyButton margin='0 10px 0 0' width='400px' onClick={() => navigate('/catalog/category1')}>Категория</MyButton>
			<MyButton margin='0 10px 0 0' width='400px' onClick={() => navigate('/catalog/category2')}>Категория</MyButton>
			<MyButton margin='0 10px 0 0' width='400px' onClick={() => navigate('/catalog/category3')}>Категория</MyButton>
		</div>
	);
};

export const Navigation = styled(NavigationContainer)`
display: flex;
	width: 1300 px;
	height: 65px;
	padding: 10px;
`;
