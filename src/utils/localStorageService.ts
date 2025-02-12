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
				artists: {},
				pictures: {},
			},
		}

		localStorage.setItem('data', JSON.stringify(defaultData))
	}
}
