import { useState } from 'react';

import styles from './Stars.module.sass';

export const Stars = ({
	className,
	selected,
	setSelected,
	isEdit = false,
}) => {
	const [hovered, setHovered] = useState(0);
	const stars = new Array(5).fill(<i className="fa-solid fa-star"></i>);

	const handleSelect = (i) => {
		setSelected && setSelected((prev) => (prev === i ? 0 : i));
	};

	const handleHover = (i) => {
		setHovered((prev) => (prev === i ? 0 : i));
	};

	return (
		<div className={className}>
			{stars.map((star, i) => (
				<div
					className={
						(selected && selected > i) || hovered > i
							? styles.active
							: styles.star
					}
					key={i}
					onClick={() => handleSelect(i + 1)}
					onMouseOver={() => isEdit && handleHover(i + 1)}
					onMouseLeave={() => isEdit && handleHover(0)}
				>
					{star}
				</div>
			))}
		</div>
	);
};
