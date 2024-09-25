import { AppRouter } from './components';
import { withAppProvider } from './hoc/withAppProvider';
import { withAppRouter } from './hoc/withAppRouter';
import { AppLoader } from './components';
import './App.sass';

const App = () => {
	return (
		<AppLoader>
				<AppRouter />
		</AppLoader>
	);
};

export default withAppRouter(withAppProvider(App));
