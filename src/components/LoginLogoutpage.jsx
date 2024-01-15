import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, loginFailed, setUserData } from '../authentication/authSlice';
import { Link } from 'react-router-dom';

export default function LoginLogoutpage() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const userData = useSelector(state => state.auth.userData);
	const loginError = useSelector(state => state.auth.loginError);

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
		<section className='loginpage'>
			{isAuthenticated ? (
				<>
					<h1>Welcome</h1>
					<div className='login-info'>
						<p>You are currently logged in.</p>
						<p>
							Check out your <Link to='/perfil'>profile</Link>, <Link to='/study'>study</Link> or log out below.
						</p>
					</div>
					<button className='logout-btn' onClick={() => dispatch(logout())}>
						↩️ Logout
					</button>
				</>
			) : (
				<>
					<h1>Login</h1>
					<form action='' className='login-form'>
						<label htmlFor='username'>Username</label>
						<input type='text' name='username' id='username' />
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' id='password' />
						<button className='login-btn' type='button' onClick={checkLogin}>
							🔐 Login
						</button>
					</form>
					{loginError && <p className='error-message'>Login failed. Please check your credentials and try again.</p>}
				</>
			)}
		</section>
	);
}
