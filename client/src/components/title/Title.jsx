/* eslint-disable react/prop-types */

import styled from 'styled-components';

export const TitleContainer = ({ className, title }) => {
	return (
		<div className={className}>
			<h2>{title}</h2>
		</div>
	);
};

export const Title = styled(TitleContainer)`
	position: relative;
	line-height: 50px;
	height: 50px;
	top: -40px;
	right: 0;
	width: 1300px;
	background: #000000;
	color: #fff;
	padding: 0 40px;
`;
