import { createSlice } from '@reduxjs/toolkit';

// Check if there's a user in local storage
const storedUser = JSON.parse(localStorage.getItem('user')) || null;

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: !!storedUser, // Set to true if there's a stored user, otherwise false
		user: storedUser || null,
		loginError: false, // login error if failed login => for feedback on login page
		/* 		userDecks: null, // update when user logs in , consists of all user decks!!!
 No need to do this here! */
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			/* state.loginError = false; */
			/* state.userDecks = storedUser.decks || null; */

			// save user info in local storage (refresh =/= logout)

			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		logout: state => {
			state.isAuthenticated = false;
			state.user = null;
			/* state.loginError = false; */

			// remove user info from local storage
			localStorage.removeItem('user');
		},
		loginFailed: state => {
			state.isAuthenticated = false;
/* 			state.user = null; */
			/* state.loginError = true; */
			// remove user info from local storage
			localStorage.removeItem('user');
		},
		setUserData: (state, action) => {
			state.user = action.payload;
		},
		updateDecks: (state, action) => {
			state.user.decks = action.payload;
		},
		setLoginError: (state, action) => {
			state.loginError = action.payload;
		},
	},
});

export const { login, logout, loginFailed, setUserData, updateDecks, setLoginError } = authSlice.actions;

export default authSlice.reducer;
