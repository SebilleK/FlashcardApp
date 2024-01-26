import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authentication/authSlice';
import studyReducer from '../features/study/studySlice';
import editReducer from '../features/edit/editSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		study: studyReducer,
		edit: editReducer,
	},
});
