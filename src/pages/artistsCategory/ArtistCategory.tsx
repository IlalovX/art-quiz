import { NavLink } from 'react-router-dom'
import CategoryList from '../../components/categoryList/CategoryList'
import PAGES from '../../conts/routes'
import { ARTISTS_CATEGORIES } from '../../data/categories'
import {
	ICategoryList,
	ILocalStorageData,
} from '../../utils/localStorageService'
import styles from './ArtistCategory.module.scss'

function ArtistCategory() {
	const { data } = JSON.parse(
		localStorage.getItem('data') as string
	) as ILocalStorageData

	return (
		<div className={styles.artist_category_root}>
			<header>
				<NavLink to={PAGES.HOME}>HOME</NavLink>
			</header>
			<CategoryList
				categories={ARTISTS_CATEGORIES}
				data={data.artists as ICategoryList}
			/>
		</div>
	)
}

export default ArtistCategory
