import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isStudying: false, // if the user is currently studying or not
	activeDeck: null, // active deck for studying (its id)
	currentCardIndex: 0, // index of the current card
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
		},
		endStudying: state => {
			state.activeDeck = null;
			state.currentCardIndex = 0;
			state.isStudying = false;
		},
	},
});

export const { deckSelect, startStudying, nextCard, endStudying } = studySlice.actions;

export default studySlice.reducer;
