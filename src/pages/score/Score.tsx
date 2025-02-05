import { NavLink, useParams } from 'react-router-dom'
import PAGES from '../../conts/routes'
import { ILocalStorageData } from '../../utils/localStorageService'
import styles from './Score.module.scss'
function Score() {
	const { game, category } = useParams()
	const { data } = JSON.parse(
		localStorage.getItem('data') as string
	) as ILocalStorageData
	console.log(data[game][category]['answers'])

	return (
		<div className={styles.score}>
			<header>
				<NavLink to={PAGES.HOME}>HOME</NavLink>
				<NavLink to={PAGES.ARTISTS}>Categories</NavLink>
			</header>
			<div className={styles.score_container}>
				{data[game][category]['answers'].map(ans => (
					<div className={styles.card} key={ans.id}>
						<header>
							<span>{category}</span>
						</header>
						<img src={`/public/assets//img/${ans.id}.jpg`} alt='' style={ans.correct ? {filter : 'grayscale(0%)'} : {filter : 'grayscale(100%)'}}/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Score
