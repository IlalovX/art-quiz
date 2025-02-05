import { useEffect } from 'react'

export function useInitData() {
	useEffect(() => {
		if (!localStorage.getItem('data')) {
			localStorage.setItem(
				'data',
				JSON.stringify({
					data: {
						pictures: [],
						artists: [],
					},
				})
			)
		}
	}, [])
}
