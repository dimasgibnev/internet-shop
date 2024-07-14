import styled from 'styled-components';
import { ControlPanel, Navigation } from './components';
/* eslint-disable react/prop-types */

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<ControlPanel />
			<Navigation />
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	width: 1300px;
	height: 150px;
	margin-bottom: 20px;
	background-color: #008290;
`;
