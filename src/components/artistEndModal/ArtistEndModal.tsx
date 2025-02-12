import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppHooks'
import { resetAmountAnswer, setOpenEndModal } from '../../store/slice/artist'

function ArtistModalEnd({ category }: { category: string }) {
	const dispatch = useAppDispatch()
	const handleClose = () => {
		dispatch(setOpenEndModal(false))
		dispatch(resetAmountAnswer())
	}
	return (
		<>
			<Typography variant='h5' component='h2' textAlign='center'>
				🎉 Конец раунда!
			</Typography>
			<Typography variant='body1' textAlign='center' mt={2}>
				Ты прошел 10 вопросов! Можешь продолжить или выйти.
			</Typography>
			<Box textAlign='center' mt={3}>
				<NavLink to={`/${category}`} onClick={handleClose}>
					В категорию
				</NavLink>
			</Box>
		</>
	)
}

export default ArtistModalEnd
