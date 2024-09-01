import React, { useState } from 'react';
import { ControlPanel, Navigation } from './components';
import './Header.sass';

export const Header = () => {
	const [catalogIsOpen, setCatalogIsOpen] = useState(false);
	return (
		<div className="header">
			<ControlPanel />
			<Navigation
				catalogIsOpen={catalogIsOpen}
				setCatalogIsOpen={setCatalogIsOpen}
			/>
			{catalogIsOpen && (
				<div className="catalog">
					<p сlassName="catalog__title">Каталог</p>
				</div>
			)}
		</div>
	);
};
