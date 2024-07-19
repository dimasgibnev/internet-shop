/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Title } from '../../components';

const CatalogContainer = ({className}) => {
	return (
		<div className={className}>
			<Title title={'Catalog'} />
		</div>
	);
};

export const Catalog = styled(CatalogContainer)`
`