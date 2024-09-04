export const ProductCard = ({ image, title, model }) => {
	return (
		<div className="product-card">
			<div className="product-card__image-wrapper">
				<img src={image} alt={title} />
			</div>
			<div className="product-card__info">
				<span className="product-card__model">{model}</span>
				<span className="product-card__title">{title}</span>
			</div>
		</div>
	);
};
