import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginError } from '../authentication/authSlice';
import { setAlert } from '../features/edit/editSlice';
import { savedModificationsAlertChange } from '../features/edit/editSlice';
export default function ErrorMessage() {
	const dispatch = useDispatch();
	// for login credentials error
	const loginError = useSelector(state => state.auth.loginError);
	// for edit user profile info error
	const alert = useSelector(state => state.edit.alert);
	// for succeful deck modification
	const savedModificationsAlert = useSelector(state => state.edit.savedModificationsAlert);

	useEffect(() => {
		if (loginError) {
			const timerId = setTimeout(() => {
				dispatch(setLoginError(false));
			}, 3000);

			return () => {
				clearTimeout(timerId);
			};
		}

		if (alert) {
			const timerId = setTimeout(() => {
				dispatch(setAlert());
			}, 3000);

			return () => {
				clearTimeout(timerId);
			};
		}

		if (savedModificationsAlert) {
			const timerId = setTimeout(() => {
				dispatch(savedModificationsAlertChange());
			}, 1500);

			return () => {
				clearTimeout(timerId);
			};
		}
	}, [dispatch, loginError && alert]);
	return (
		<>
			{loginError && (
				<div className='shake text-red-500 font-medium mb-4' role='alert'>
					Login failed. Please check your credentials and try again.
				</div>
			)}

			{alert && (
				<div className='shake text-red-500 font-medium mb-4' role='alert'>
					Please input a username with at least 3 characters and a valid email address.
				</div>
			)}

			{savedModificationsAlert && (
				<div className='fadeIn font-medium mb-4' role='alert'>
					Changes saved successfully!
				</div>
			)}
		</>
	);
}
