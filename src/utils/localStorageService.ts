import images from '../data/images'

export interface IAnswers {
	id: number
	question: string
	answer: string
	correct: boolean
	choseAnswe: string
}

export interface IDataCategory {
	title: string
	answers: IAnswers[]
	mark: number
}

export interface ICategoryList {
	[key: string]: IDataCategory
}

export interface ILocalStorageData {
	data: {
		pictures: ICategoryList | object
		artists: ICategoryList | object
	}
}

export function initLocalStorage(): void {
	const existingData = localStorage.getItem('data')

	if (!existingData) {
		const defaultData: ILocalStorageData = {
			data: {
				artists: {
					portrait: {
						mark: 3,
						title: 'portrait',
						answers: [
							{
								id: 0,
								question: images[0].imageNum,
								answer: images[0].author,
								choseAnswer: images[0].author,
								correct: true,
							},
							{
								id: 1,
								question: images[1].imageNum,
								answer: images[1].author,
								choseAnswer: images[1].author,
								correct: true,
							},
							{
								id: 2,
								question: images[2].imageNum,
								answer: images[2].author,
								choseAnswer: images[5].author,
								correct: false,
							},
						],
					},
				},
				pictures: {
					portrait: {
						mark: 1,
						title: 'portrait',
						answers: [
							{
								id: 120,
								question: images[120].author,
								answer: images[120].imageNum,
								choseAnswer: images[120].imageNum,
								correct: true,
							},
							{
								id: 121,
								question: images[121].author,
								answer: images[121].author,
								choseAnswer: images[130].imageNum,
								correct: false,
							},
						],
					},
				},
			},
		}

		localStorage.setItem('data', JSON.stringify(defaultData))
	}
}
