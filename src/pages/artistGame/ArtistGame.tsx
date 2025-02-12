import { Box, Modal } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ArtistModalEnd from '../../components/artistEndModal/ArtistEndModal'
import PAGES from '../../conts/routes'
import images from '../../data/images'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks'
import {
	resetAmountAnswer,
	resetArtChoseAnswer,
	resetDownTime,
	updateArtChoseAnswer,
	updateDownTime,
	updateInitAnswer,
	updateIsEndModal,
} from '../../store/slice/artist'
import { modalStyle } from '../../styles/modal'
import Random from '../../utils/shuffleArtistOptionsArray'
import styles from './ArtistGame.module.scss'

function ArtistGame() {
	const dispatch = useAppDispatch()
	const { lvl, category } = useParams()
	const { artChoseAnswer, downTime, amountAnswers, isEndModal } =
		useAppSelector(state => state.art)

	const [open, setOpen] = useState(false)
	const timerRef = useRef<number | null>(null)

	const stopTimer = () => {
		if (timerRef.current !== null) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
	}

	const handleOpen = useCallback(
		(index: string) => {
			stopTimer()
			setOpen(true)
			dispatch(updateArtChoseAnswer(index))
		},
		[dispatch]
	)

	const handleClose = () => {
		dispatch(
			updateInitAnswer({
				category: 'artists',
				title: category as string,
				id: lvl as string,
				question: images[Number(lvl)].imageNum,
				answer: images[Number(lvl)].author,
				choseAnswer: artChoseAnswer,
				correct: images[Number(lvl)].imageNum == artChoseAnswer,
			})
		)

		dispatch(resetArtChoseAnswer())
		dispatch(resetDownTime())

		setOpen(false)
	}

	const openEndModal = useCallback(() => {
		dispatch(resetAmountAnswer())
		dispatch(updateIsEndModal())
	}, [])

	useEffect(() => {
		if (downTime > 0) {
			timerRef.current = window.setInterval(() => {
				dispatch(updateDownTime())
			}, 1000)
		} else if (!open) {
			setOpen(true)
			dispatch(resetDownTime())
		}

		return stopTimer
	}, [downTime, dispatch, open])

	useEffect(() => {
		if (artChoseAnswer) {
			stopTimer()
		}
	}, [artChoseAnswer])

	return (
		<>
			<div className={styles.artist_game}>
				<header>
					<NavLink to={PAGES.HOME}>HOME</NavLink>
					<div>
						<h2>
							Кто автор данной <br /> картины?
						</h2>
						<span>00:{downTime < 10 ? `0${downTime}` : downTime}</span>
					</div>
					<NavLink to={PAGES.ARTISTS}>Categories</NavLink>
				</header>
				<div className={styles.content}>
					<img src={`/assets/img/${images[Number(lvl)].imageNum}.jpg`} alt='' />
					<Random
						lvl={lvl as string}
						styles={styles}
						handleOpen={handleOpen}
						key={lvl}
					/>
				</div>
			</div>
			<Modal
				className={styles.modal_artist_game}
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<div className={styles.modal_content}></div>
					{!isEndModal ? (
						<>
							{lvl == artChoseAnswer ? (
								<div>
									<h2 style={{ color: 'green' }}>Correct!</h2>
									<img
										className={styles.modal_content_image}
										src={`/assets/img/${images[Number(lvl)].imageNum}.jpg`}
										alt=''
									/>
									<p>{images[Number(artChoseAnswer)].author}</p>
								</div>
							) : (
								<div>
									<h2 style={{ color: 'red' }}>Wrong!</h2>
									{artChoseAnswer ? (
										<p>Вы выбрали: {images[Number(artChoseAnswer)].author}</p>
									) : (
										<p>Вы не выбрали в отведенное время</p>
									)}
									<img
										className={styles.modal_content_image}
										src={`/assets/img/${images[Number(lvl)].imageNum}.jpg`}
										alt=''
									/>
									<p>Правильный ответ: {images[Number(lvl)].author}</p>
								</div>
							)}

							{amountAnswers != 9 ? (
								<NavLink
									onClick={handleClose}
									to={`/artists/${category as string}/${+(lvl as string) + 1}`}
								>
									Next
								</NavLink>
							) : (
								<button onClick={openEndModal}>Продолжить</button>
							)}
						</>
					) : (
						<ArtistModalEnd category={'artists'} />
					)}
				</Box>
			</Modal>
		</>
	)
}

export default ArtistGame
