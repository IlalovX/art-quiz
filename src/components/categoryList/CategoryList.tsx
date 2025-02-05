import { ICategory } from '../../data/categories'
import { ICategoryList } from '../../utils/localStorageService'
import CategoryCard from '../categoryCard/CategoryCard'
import styles from './CategoryList.module.scss'

function CategoryList({
	categories,
	data,
}: {
	categories: ICategory[]
	data: ICategoryList
}) {
	console.log(data[categories[0].title])

	return (
		<div className={styles.artist_category_container}>
			{categories.map(artistCategory => (
				<CategoryCard
					category={artistCategory}
					key={artistCategory.path}
					data={data[artistCategory.title] ? data[artistCategory.title] : null}
				/>
			))}
		</div>
	)
}

export default CategoryList
