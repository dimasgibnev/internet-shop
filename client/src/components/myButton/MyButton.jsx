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
	margin: ${({margin = '0'}) => margin};
	height: ${({height= '50px'}) => height};
	cursor: pointer;
	border: 2px solid rgba(5, 13, 167, 0.527);
	box-shadow: 4px 4px 2px 1px rgba(0, 0, 255, .2);
	border-radius: 5px;
	&:last-child {
		margin-right: 0;
	}
`;

MyButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};
