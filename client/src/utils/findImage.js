export const findImage = (images) => {
	const mainImage = images.find((image) => image.title === 'main');

	return mainImage.url;
};
