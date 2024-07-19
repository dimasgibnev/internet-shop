import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components';

export const App = () => {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
};
