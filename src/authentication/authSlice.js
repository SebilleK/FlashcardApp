import { createSlice } from '@reduxjs/toolkit';

// Check if there's a user in local storage
const storedUser = JSON.parse(localStorage.getItem('user')) || null;

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: !!storedUser, // Set to true if there's a stored user, otherwise false
		user: storedUser || null,
		loginError: false, // login error if failed login => for feedback on login page
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.loginError = false;

			// save user info in local storage (refresh =/= logout)

			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		logout: state => {
			state.isAuthenticated = false;
			state.user = null;
			state.loginError = false;

			// remove user info from local storage
			localStorage.removeItem('user');
		},
		loginFailed: state => {
			state.isAuthenticated = false;
			state.user = null;
			state.loginError = true;
			// remove user info from local storage
			localStorage.removeItem('user');
		},
		setUserData: (state, action) => {
			state.userData = action.payload;
		},
	},
});

export const { login, logout, loginFailed, setUserData } = authSlice.actions;

export default authSlice.reducer;
