import { useSelector } from 'react-redux';
import styles from './Menu.module.sass';
import { Categorie } from './Categorie';

export const Menu = ({ isOpen }) => {
	const categories = useSelector((state) => state.category.data);
	
	return (
		<>
			{isOpen ? (
				<div className={styles.menu}>
					<ul>
						{categories.map(({ _id, title, childCategories }) => (
							<Categorie
								key={_id}
								title={title}
								categories={childCategories}
							/>
						))}
					</ul>
				</div>
			) : null}
		</>
	);
};
