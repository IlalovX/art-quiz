import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PAGES from './conts/routes'
import { initLocalStorage } from './utils/localStorageService'

function App() {
	useEffect(() => {
		initLocalStorage()
	}, [])
	const Home = lazy(() => import('./pages/home/Home'))
	const ArtistCategory = lazy(
		() => import('./pages/artistsCategory/ArtistCategory')
	)
	const PicturesCategory = lazy(
		() => import('./pages/picturesCategory/PicturesCategory')
	)
	const Settings = lazy(() => import('./pages/settings/Settings'))
	const ArtistGame = lazy(() => import('./pages/artistGame/ArtistGame'))
	const PictureGame = lazy(() => import('./pages/pictureGame/PictureGame'))
	const Score = lazy(() => import('./pages/score/Score'))
	return (
		<Routes>
			<Route
				path={PAGES.HOME}
				element={
					<Suspense>
						<Home />
					</Suspense>
				}
			/>
			<Route
				path={PAGES.ARTISTS}
				element={
					<Suspense>
						<ArtistCategory />
					</Suspense>
				}
			/>
			<Route
				path={PAGES.PICTURES}
				element={
					<Suspense>
						<PicturesCategory />
					</Suspense>
				}
			/>
			<Route
				path={PAGES.SETTINGS}
				element={
					<Suspense>
						<Settings />
					</Suspense>
				}
			/>
			<Route
				path={PAGES.ARIST_GAME}
				element={
					<Suspense>
						<ArtistGame />
					</Suspense>
				}
			/>
			<Route
				path={PAGES.PICTURES_GAME}
				element={
					<Suspense>
						<PictureGame />
					</Suspense>
				}
			/>
			<Route
				path={PAGES.SCORE}
				element={
					<Suspense>
						<Score />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default App
