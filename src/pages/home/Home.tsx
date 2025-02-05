import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PAGES from '../../conts/routes'
import styles from './Home.module.scss'
function Home() {
	
	return (
		<div className={styles.home_root}>
			<div className={styles.home_content}>
				<div className={styles.container}>
					<NavLink to={PAGES.ARTISTS}>
						<div className={styles.nav_artists__bg}></div>
						<p>
							<span>ARTISTS</span> QUIZ
						</p>
					</NavLink>
					<NavLink to={PAGES.PICTURES}>
						<div className={styles.nav_pictures__bg}></div>
						<p>
							<span>PICTURES</span> QUIZ
						</p>
					</NavLink>
				</div>
				<div className={styles.settings}>
					<NavLink to={PAGES.SETTINGS}>Settings</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Home
