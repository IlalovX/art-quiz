import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILocalStorageData } from '../../utils/localStorageService'

interface IAmoutActionPayload {
	category: string
	title: string
}

interface IActionPayloadStorage {
	category: string
	title: string
	id: string
	question: string
	answer: string
	choseAnswer: string
	correct: boolean
}

interface IState {
	volumeValue: number
	artChoseAnswer: string
	downTime: number
	amountAnswers: number
	openEndModal: boolean
	isEndModal: boolean
}

const initialState: IState = {
	volumeValue: 0,
	artChoseAnswer: '',
	openEndModal: false,
	amountAnswers: 1,
	downTime: 30,
	isEndModal: false,
}

export const quizSlice = createSlice({
	name: 'art',
	initialState,
	reducers: {
		updateVolumeValue: (state, action: PayloadAction<number>) => {
			state.volumeValue = action.payload
		},
		updateArtChoseAnswer: (state, action: PayloadAction<string>) => {
			state.artChoseAnswer = action.payload
		},
		resetArtChoseAnswer: state => {
			state.artChoseAnswer = ''
		},
		updateDownTime: state => {
			state.downTime -= 1
		},
		resetDownTime: state => {
			state.downTime = 30
		},
		setOpenEndModal: (state, action: PayloadAction<boolean>) => {
			state.openEndModal = action.payload
		},
		resetAmountAnswer: state => {
			state.amountAnswers = 1
			state.isEndModal = false
		},
		updateIsEndModal: state => {
			state.isEndModal = !state.isEndModal
		},
		updateInitAnswer: (state, action: PayloadAction<IActionPayloadStorage>) => {
			const { category, title, id, question, answer, choseAnswer, correct } =
				action.payload

			const storedData = localStorage.getItem('data')
			if (!storedData) return

			const parsedData: ILocalStorageData = JSON.parse(storedData)

			// Проверяем, есть ли категория
			if (!parsedData.data[category]) return

			// Проверяем, есть ли title внутри категории
			if (!parsedData.data[category][title]) {
				parsedData.data[category][title] = {
					mark: 0,
					title: title,
					answers: [],
				}
			}

			const categoryItem = parsedData.data[category][title]

			if (correct) {
				categoryItem.mark += 1
			}

			categoryItem.answers.push({
				id: id,
				question,
				answer,
				choseAnswer,
				correct,
			})

			localStorage.setItem('data', JSON.stringify(parsedData))
			state.amountAnswers = categoryItem['answers'].length
		},
	},
})

export const {
	updateVolumeValue,
	setOpenEndModal,
	updateArtChoseAnswer,
	resetArtChoseAnswer,
	resetDownTime,
	resetAmountAnswer,
	updateInitAnswer,
	updateDownTime,
	updateIsEndModal,
} = quizSlice.actions
export default quizSlice.reducer
