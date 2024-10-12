import {
	About,
	Authorization,
	Cart,
	Home,
	NotFound,
	Products,
	Product,
	Profile,
	Registration,
	WishList,
} from '../pages';
import { ROUTES } from '../constants';
import { ROLES } from '../constants/roles';
import { Order } from '../pages/product/components';

export const routeConfig = [
	{
		path: ROUTES.ABOUT,
		element: <About />,
	},
	{
		path: ROUTES.CART,
		element: <Cart />,
	},
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
		auth: true,
		roles: [ROLES.USER, ROLES.ADMIN],
	},
	{
		path: ROUTES.ORDER,
		element: <Profile />,
		auth: true,
		roles: [ROLES.USER, ROLES.ADMIN],
	},
	{
		path: ROUTES.PRODUCTS,
		element: <Products />,
	},
	{
		path: ROUTES.PRODUCT,
		element: <Product />,
	},
	{
		path: ROUTES.PRODUCT_LINE,
		element: <Products />,
	},
	{
		path: ROUTES.PRODUCT_CATEGORY,
		element: <Products />,
	},
	{
		path: ROUTES.WISHLIST,
		element: <WishList />,
	},
	{
		path: ROUTES.NOT_FOUND,
		element: <NotFound />,
	},
];
