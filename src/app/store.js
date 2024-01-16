import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authentication/authSlice';
import studyReducer from '../features/study/studySlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		study: studyReducer,
	},
});
