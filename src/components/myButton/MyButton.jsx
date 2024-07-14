import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const MyButtonContainer = ({ className, children, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export const MyButton = styled(MyButtonContainer)`
	width: ${({ width = '150px' }) => width};
	margin-right: 10px;
	height: 100%;
	cursor: pointer;
	&:last-child {
		margin-right: 0;
	}
`;

MyButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};
