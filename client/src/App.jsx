import { BrowserRouter} from 'react-router-dom';
import { AppRouter } from './components';
import "./App.sass"

export const App = () => {
	return (
		<BrowserRouter>
			<AppRouter/>
		</BrowserRouter>
	);
};
