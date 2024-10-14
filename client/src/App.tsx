import { FC } from 'react';

import { AppRouter } from './components';
import { AppLoader } from './components';

import { withAppProvider } from './hoc/withAppProvider';
import { withAppRouter } from './hoc/withAppRouter';

import './App.sass';

const App: FC = () => {
	return (
		<AppLoader>
				<AppRouter />
		</AppLoader>
	);
};

export default withAppRouter(withAppProvider(App));