import { Assembly, Cordless, FirstInstruments, Foundation, Slider } from './components';
import { Scroll } from '../../components/ui';

import styles from './About.module.sass';

export const About = () => {
	return (
		<div className={styles.about}>
			<h1 className={styles.title}>О нас</h1>
			<div className={styles.logo}>
				<img src="/img/about/100-years.gif" alt="100 лет макита лого" />
			</div>
			<Foundation />
			<FirstInstruments />
			<Cordless />
			<Assembly />
			<Slider />
			<Scroll />
		</div>
	);
};
