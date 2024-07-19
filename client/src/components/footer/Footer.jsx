import styled from 'styled-components';
/* eslint-disable react/prop-types */

const FooterContainer = ({ className }) => {
	return <div className={className}>Footer</div>;
};

export const Footer = styled(FooterContainer)`
	display: flex;
	width: 100%;
	height: 375px;
	color: #fff;
	background-color: #000000;
`;
