import { useState } from 'react'
import images from '../data/images'

export default function Random({
	lvl,
	styles,
	handleOpen,
}: {
	lvl: string
	styles: Record<string, string>
	handleOpen: (index: string) => void
}) {
	const [shuffledOptions] = useState(() => {
		return [
			Number(lvl),
			Number(lvl) + 1,
			Number(lvl) + 2,
			Number(lvl) + 3,
		].sort(() => Math.random() - 0.5)
	})

	return (
		<div className={styles.answers_conteiner}>
			{shuffledOptions.map(item => (
				<button onClick={() => handleOpen(String(item))} key={item}>
					{images[item].author}
				</button>
			))}
		</div>
	)
}
