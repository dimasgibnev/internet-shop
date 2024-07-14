/* eslint-disable react/prop-types */

import styled from "styled-components";
import { MyButton } from "../../myButton/MyButton";


const NavigationContainer = ({ className }) => {
	return (
		<div className={className}>
			<MyButton width='400px'>Каталог</MyButton>
			<MyButton width='400px'>Категория</MyButton>
			<MyButton width='400px'>Категория</MyButton>
			<MyButton width='400px'>Категория</MyButton>
		</div>
	);
};

export const Navigation = styled(NavigationContainer)`
display: flex;
	width: 1300 px;
	height: 65px;
	padding: 10px;
`;
