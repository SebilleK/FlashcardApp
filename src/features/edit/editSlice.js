import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEditing: false,
	alert: false,
	isDeckEditing: false,
	isFlashcardEditing: false,
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
	},
});

export const { startEditing, stopEditing, setAlert, setDeckEditing, setFlashcardEditing } = editSlice.actions;

export default editSlice.reducer;
