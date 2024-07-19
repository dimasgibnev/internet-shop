/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router';
import styled from 'styled-components';

const LogoContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<img
			className={className}
			src="https://cdn.makitatools.com//apps/cms/logo/d6fd3a5a-a919-46f1-9e08-bdc4345cb039_makita_l_500px.png?w=120&trim.threshold=80&trim.percentpadding=1"
			alt="logo makita"
			onClick={() => navigate('/')}
		/>
	);
};

export const Logo = styled(LogoContainer)`
	width: 120px;
	height: 50px;
	cursor: pointer;
	margin-right: 10px;
`;
