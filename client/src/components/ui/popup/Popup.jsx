import styles from './Popup.module.sass';

export const Popup = ({ isOpen, className, links }) => {
	return isOpen ? (
		<div className={styles.menu + ' ' + className}>
			{links.map((link, i) => {
				return (
					<li className={styles.item} key={i}>
						{link}
					</li>
				);
			})}
		</div>
	) : null;
};
