import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authentication/authSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
	},
});
