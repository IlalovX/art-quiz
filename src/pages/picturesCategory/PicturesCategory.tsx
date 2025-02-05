import { NavLink } from 'react-router-dom'
import CategoryList from '../../components/categoryList/CategoryList'
import PAGES from '../../conts/routes'
import { PICTURES_CATEGORIES } from '../../data/categories'
import {
	ICategoryList,
	ILocalStorageData,
} from '../../utils/localStorageService'
import styles from './PicturesCategory.module.scss'
function PicturesCategory() {
	const { data } = JSON.parse(
		localStorage.getItem('data') as string
	) as ILocalStorageData
	
	return (
		<div className={styles.pictures_category_root}>
			<header>
				<NavLink to={PAGES.HOME}>HOME</NavLink>
			</header>
			<CategoryList
				categories={PICTURES_CATEGORIES}
				data={data.pictures as ICategoryList}
			/>
		</div>
	)
}

export default PicturesCategory
