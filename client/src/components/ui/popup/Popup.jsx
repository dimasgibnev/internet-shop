import styles from './Popup.module.sass';

export const Popup = ({ isOpen, className, links }) => {
	
	return isOpen ? (
		<div className={styles.menu + ' ' + className}>
			<ul>
				{links.map((link, i) => {
					console.log(link);
					
					return (
						<li className={styles.item} key={i}>
							{link}
						</li>
					)
				})}
			</ul>
		</div>
	) : null;
};
