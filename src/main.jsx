import ReactDOM from 'react-dom/client';
import { InternetShop } from './InternetShop.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<InternetShop />
	</BrowserRouter>,
);
