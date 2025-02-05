import { Box, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PAGES from '../../conts/routes'
import images from '../../data/images'
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
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<div className={styles.picture_game}>
				<header>
					<NavLink to={PAGES.HOME}>HOME</NavLink>
					<div>
						<h2>
							Какую картину написал <br /> {images[0].name} ?
						</h2>
						<span>00:00</span>
					</div>
					<NavLink to={PAGES.PICTURES}>Categories</NavLink>
				</header>
				<div className={styles.answers_conteiner}>
					<img
						onClick={handleOpen}
						src={`/assets/img/${images[0].imageNum}.jpg`}
						alt=''
					/>
					<img
						onClick={handleOpen}
						src={`/assets/img/${images[1].imageNum}.jpg`}
						alt=''
					/>
					<img
						onClick={handleOpen}
						src={`/assets/img/${images[2].imageNum}.jpg`}
						alt=''
					/>
					<img
						onClick={handleOpen}
						src={`/assets/img/${images[3].imageNum}.jpg`}
						alt=''
					/>
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

export default PictureGame
