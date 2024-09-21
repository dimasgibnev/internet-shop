import { About, Authorization, Home, Products, Profile, Registration } from '../pages';
import { ROUTES } from '../constants';

export const routeConfig = [
	{
		path: ROUTES.HOME,
		element: <Home />,
	},
	{
		path: ROUTES.LOGIN,
		element: <Authorization />,
	},
	{
		path: ROUTES.REGISTER,
		element: <Registration />,
	},
	{
		path: ROUTES.PROFILE,
		element: <Profile />,
	},
	{
		path: ROUTES.PRODUCTS,
		element: <Products />,
	},
	{
		path: ROUTES.PRODUCT_CATEGORY,
		element: <Products />,
	},
	{
		path: ROUTES.ABOUT,
		element: <About />,
	},
	{
		path: ROUTES.NOT_FOUND,
		element: <Home />,
	},
];

