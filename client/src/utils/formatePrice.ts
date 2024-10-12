export const formatePrice = (price: string) => {
	let reverse = '';
	let formated = ''
	for (let i = price.length - 1; i >= 0; i--) {
		reverse = reverse + price[i];
	}
	for (let i = 0; i < reverse.length; i++) {
		if (i % 3 === 0 && i !== 0) {
			formated = reverse[i] + ',' + formated
		}
		else {
			formated = reverse[i] + formated
		}
	}
	return formated.split('').join('').replaceAll(',', ' ');
};
