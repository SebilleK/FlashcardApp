import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login, loginFailed, setUserData } from '../rtk/authSlice';

export default function LoginLogoutpage() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const userData = useSelector(state => state.auth.userData);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('http://localhost:3001/users');
				const data = await response.json();
				dispatch(setUserData(data));
			} catch (error) {
				console.error('Error while fetching data:', error);
			}
		};

		fetchUserData();
	}, [dispatch]);

	function checkLogin() {
		let usernameInput = document.getElementById('username').value;
		let passwordInput = document.getElementById('password').value;

		/* Find the user w/ correct credentials, if any */
		const user = userData.find(u => u.username === usernameInput && u.password === passwordInput);

		if (user) {
			dispatch(login(user));
			console.log('Login successful');
		} else {
			dispatch(loginFailed());
			console.log('Login failed');
		}
	}

	return (
		<>
			<h1>Loginpage</h1>

			<form action=''>
				<label htmlFor='username'>Username</label>
				<input type='text' name='username' id='username' />
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' />
				<button type='button' onClick={checkLogin}>
					Login
				</button>
			</form>
		</>
	);
}
