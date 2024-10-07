import styles from '../About.module.sass';

export const Article = ({ children }) => {
	const [title1, title2, text1, text2, image1, image2, image3] = children;

	return (
		<section className={styles.section}>
			<div className={styles.article}>
				<div className={styles.old}>
					<div className={styles.title}>{title1}</div>
					<div className={styles.text}>{text1}</div>
				</div>
				<div className={styles.new}>
					<div className={styles.title}>{title2}</div>
					<div className={styles.text}>{text2}</div>
				</div>
			</div>
			<div className={styles.images}>
				{image1}
				{image2}
				{image3}
			</div>
		</section>
	);
};
