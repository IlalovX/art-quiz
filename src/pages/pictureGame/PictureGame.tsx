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
import RandomPicture from '../../utils/shufflePictureOptions'
import styles from './PictureGame.module.scss'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}
function PictureGame() {
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
				category: 'pictures',
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
			<div className={styles.picture_game}>
				<header>
					<NavLink to={PAGES.HOME}>HOME</NavLink>
					<div>
						<h2>
							Какую картину написал <br /> {images[0].name} ?
						</h2>
						<span>00:{downTime < 10 ? `0${downTime}` : downTime}</span>
					</div>
					<NavLink to={PAGES.PICTURES}>Categories</NavLink>
				</header>
				<RandomPicture
					lvl={lvl as string}
					styles={styles}
					handleOpen={handleOpen}
					key={lvl}
				/>
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
									<p>{images[Number(lvl)].author}</p>
									<img
										className={styles.modal_content_image}
										src={`/assets/img/${images[Number(lvl)].imageNum}.jpg`}
										alt=''
									/>
								</div>
							) : (
								<div>
									<h2 style={{ color: 'red' }}>Wrong!</h2>
									{artChoseAnswer ? (
										<p>
											Вы выбрали:{' '}
											<img
												src={`/assets/img/${images[artChoseAnswer].imageNum}.jpg`}
												style={{ width: '200px', height: '200px' }}
											/>
										</p>
									) : (
										<p>Вы не выбрали в отведенное время</p>
									)}
									<img
										className={styles.modal_content_image}
										src={`/assets/img/${images[Number(lvl)].imageNum}.jpg`}
										style={{ width: '200px', height: '200px' }}
									/>
									<p>Правильный ответ: {images[Number(lvl)].author}</p>
								</div>
							)}

							{amountAnswers != 9 ? (
								<NavLink
									onClick={handleClose}
									to={`/pictures/${category as string}/${+(lvl as string) + 1}`}
								>
									Next
								</NavLink>
							) : (
								<button className={styles.continue_btn} onClick={openEndModal}>
									Продолжить
								</button>
							)}
						</>
					) : (
						<ArtistModalEnd category={'pictures'} />
					)}
				</Box>
			</Modal>
		</>
	)
}

export default PictureGame
