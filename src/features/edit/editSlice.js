import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEditing: false,
	alert: false,
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
		setAlert : state => {
			state.alert = !state.alert 
		}
	},
});

export const { startEditing, stopEditing, setAlert } = editSlice.actions;

export default editSlice.reducer;
