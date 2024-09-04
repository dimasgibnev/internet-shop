import { Link } from 'react-router-dom';
import './Footer.sass';

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__links links">
				<div className="links__wrapper">
					<span className="links__title">Инструменты</span>
					<Link className="links__item">Аккумуляторные</Link>
					<Link className="links__item">Сетевые</Link>
					<Link className="links__item">Акссесуары</Link>
					<Link className="links__item">Бензотехника</Link>
					<Link className="links__item">Уборка</Link>
				</div>
				<div className="links__wrapper">
					<span className="links__title">Полезные ссылки</span>
					<Link className="links__item">Сервесный центр</Link>
					<Link className="links__item">FAQ</Link>
					<Link className="links__item">Документация</Link>
					<Link className="links__item">Регистрация</Link>
				</div>
				<div className="links__wrapper">
					<span className="links__title">Контакты</span>
					<Link to={'/about'} className="links__item">О нас</Link>
					<Link to={'/contacts'} className="links__item">Связь с нами</Link>
				</div>
			</div>
			<div className="footer__copyright">
				<span>{new Date().getFullYear()} Разработка Дмитрий Сгибнев</span>
			</div>
		</footer>
	);
};
