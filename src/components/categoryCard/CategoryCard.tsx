import { NavLink, useLocation } from 'react-router-dom'
import { ICategory } from '../../data/categories'
import { IDataCategory } from '../../utils/localStorageService'
import styles from './CategoryCard.module.scss'
function CategoryCard({
	category,
	data,
}: {
	category: ICategory
	data: IDataCategory | null
}) {
	const loc = useLocation()
	return (
		<div key={category.path} className={styles.card}>
			<header>
				<NavLink to={category.path}>{category.title}</NavLink>
				{data && data.title == category.title && data.mark && (
					<span>{data.mark}</span>
				)}
			</header>
			<img
				src={`/public/assets/img/${category.img}`}
				alt=''
				style={
					data?.answers
						? { filter: 'grayscale(0%)' }
						: { filter: 'grayscale(100%)' }
				}
			/>
			{data && data.title == category.title && data.answers && (
				<NavLink
					to={`/score${loc.pathname}/${category.title}`}
					className={styles.score_btn}
				>
					Score
				</NavLink>
			)}
		</div>
	)
}

export default CategoryCard
