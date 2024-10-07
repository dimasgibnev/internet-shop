export interface IBanner {
	title: string;
	model: string;
	image: string;
	style: string;
	link: string;
}

export const banners: IBanner[] = [
	{
		title: 'ОБЕСПЕЧИВАЕТ МОЩНОСТЬ ПРОВОДНОГО ФРЕЗЕРА С МАКСИМАЛЬНОЙ МОЩНОСТЬЮ 2-1/4 Л.С.',
		model: 'GPR01Z: Макс. 40 В Бесщеточный аккумуляторный фрезер XGT® с максимальной мощностью 2-1/4 л.с.',
		image: 'hero-october-gpr01z.jpg',
		style: 'gpr01z',
		link: '6700e9e1bbd62421208e22dc',
	},
	{
		title: 'САМЫЙ МОЩНЫЙ АККУМУЛЯТОРНЫЙ ОТБОЙНЫЙ МОЛОТОК В СВОЕМ КЛАССЕ',
		model: 'GMH04PL4X: макс. 80 В (макс. 40 В X2) XGT Бесщеточный 70 фунтов, Набор отбойных молотков',
		image: 'hero-october-gmh04pl4x.jpg',
		style: 'GMH04PL4X',
		link: '670289bd36b0d382df30022f',
	},
	{
		title: 'НА 45% БОЛЬШЕ МОЩНОСТИ, на 55% МЕНЬШЕ ВИБРАЦИИ',
		model: 'GEC03T: Максимальное напряжение 40 В XGT Бесщеточный 9-дюймовый силовой резак комплект',
		image: 'hero-october-gec03.jpg',
		style: 'GEC03T',
		link: '6702bb93acaf58e449a7370e',
	},
	{
		title: 'ВЕСИТ НА 20% МЕНЬШЕ, ЧЕМ ГАЗОВЫЕ МОДЕЛИ',
		model: 'GNU01Z: Максимальное напряжение 40 В XGT 24-дюймовый шарнирный триммер для живой изгороди',
		image: 'hero-october-gnu01.jpg',
		style: 'GNU01Z',
		link: '67037644425edd04625b161a',
	},
];
