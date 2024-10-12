export const formatePrice = (price: number) => {
	const stringPrice = String(price);
	let reverse = '';

	for (let i = stringPrice.length - 1; i >= 0; i--) {
		if (i % 3 === 0) {
			reverse = reverse + ',' + stringPrice.charAt(i);
		}
		reverse = reverse + stringPrice.charAt(i);
	}

	const formated = reverse.split(',').reverse().join().replaceAll(',', ' ');

	return formated;
};
