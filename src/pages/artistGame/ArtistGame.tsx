import { Box, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import PAGES from '../../conts/routes'
import images from '../../data/images'
import styles from './ArtistGame.module.scss'

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
function ArtistGame() {
	const { lvl } = useParams()

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<div className={styles.artist_game}>
				<header>
					<NavLink to={PAGES.HOME}>HOME</NavLink>
					<div>
						<h2>
							Кто автор данной <br /> картины?
						</h2>
						<span>00:00</span>
					</div>
					<NavLink to={PAGES.ARTISTS}>Categories</NavLink>
				</header>
				<div className={styles.content}>
					<img src={`/assets/img/${images[Number(lvl)].imageNum}.jpg`} alt='' />
					<div className={styles.answers_conteiner}>
						<button onClick={handleOpen}>{images[0].author}</button>
						<button onClick={handleOpen}>{images[1].author}</button>
						<button onClick={handleOpen}>{images[2].author}</button>
						<button onClick={handleOpen}>{images[3].author}</button>
					</div>
				</div>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</>
	)
}

export default ArtistGame
