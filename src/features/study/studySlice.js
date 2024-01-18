import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isStudying: false, // if the user is currently studying or not
	activeDeck: null, // active deck for studying (its id)
	currentCardIndex: 0, // index of the current card
	showAnswer: false, // answer is shown or not
	showNotification: false, // notification on deck completion
};

const studySlice = createSlice({
	name: 'study',
	initialState,
	reducers: {
		deckSelect: (state, action) => {
			state.activeDeck = action.payload;
		},
		startStudying: (state, action) => {
			state.currentCardIndex = 0;
			state.isStudying = true;
		},
		nextCard: state => {
			state.currentCardIndex += 1;
			state.showAnswer = false;
		},
		showAnswer: state => {
			state.showAnswer = !state.showAnswer; // toggle show answer
		},
		endStudying: state => {
			state.activeDeck = null;
			state.currentCardIndex = 0;
			state.isStudying = false;
			state.showNotification = true;
		},
		toggleNotification: state => {
			state.showNotification = !state.showNotification;
		},

		setCurrentCardIndex: (state, action) => {
			state.currentCardIndex = action.payload;
		},
	},
});

export const { deckSelect, startStudying, nextCard, showAnswer, endStudying, toggleNotification, setCurrentCardIndex } = studySlice.actions;

export default studySlice.reducer;
