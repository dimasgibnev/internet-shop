/* eslint-disable react/prop-types */
import styled from 'styled-components';

const PageContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const Page = styled(PageContainer)`
	display: flex;
	width: 100%;
	min-height: 550px;
	margin-bottom: 20px;
	background-color: #e7e7e7;
`;
