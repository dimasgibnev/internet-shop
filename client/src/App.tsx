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


// отзывы:
// 	если нет отзывов рендерить карточку отзыва

// корзина:
// 	сделать фикирванное окно со скроллом без пагинации
// 	добавить, общую стоимость в слайс
// 	подсчет корзины на беке с учетом отсутсвующих на складе
// 	обработчикк кнпоок плююс и минус
// 	добавить очистку корзины
// aподписка о поступление товара
// 	создать поле у пользователя с подписками в которых хранятся айдишники
// 	создать поле сообщений
// 	добавить эндпоинт для сообщений только для админа