import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEditing: false,
	alert: false,
	isDeckEditing: false,
	isFlashcardEditing: false,
	activeFlashcard: null, // stores flashcard id
	activeDeck: null, // stores deck id
	newFlashcardsToAdd: [], // stores flashcards to add to the deck
	isDeckCreating: false,
};

const editSlice = createSlice({
	name: 'edit',
	initialState,
	reducers: {
		startEditing: state => {
			state.isEditing = true;
		},
		stopEditing: state => {
			state.isEditing = false;
		},
		setAlert: state => {
			state.alert = !state.alert;
		},
		setDeckEditing: state => {
			state.isDeckEditing = !state.isDeckEditing;
			console.log(state.isDeckEditing);
		},
		setFlashcardEditing: state => {
			state.isFlashcardEditing = !state.isFlashcardEditing;
			console.log(state.isFlashcardEditing);
		},
		setActiveFlashcard: (state, action) => {
			state.activeFlashcard = action.payload;
		},
		setActiveDeck: (state, action) => {
			state.activeDeck = action.payload;
		},
		setNewFlashcardToAdd: (state, action) => {
			// Instead of using += to add a new flashcard, spread operator is better to properly update the state array
			state.newFlashcardsToAdd = [...state.newFlashcardsToAdd, action.payload];
		},
		clearNewFlashcardsToAdd: state => {
			state.newFlashcardsToAdd = [];
		},
		setDeckCreating: state => {
			state.isDeckCreating = !state.isDeckCreating;
		}
	},
});

export const { startEditing, stopEditing, setAlert, setDeckEditing, setFlashcardEditing, setActiveFlashcard, setActiveDeck, setNewFlashcardToAdd, clearNewFlashcardsToAdd, setDeckCreating } = editSlice.actions;

export default editSlice.reducer;
