import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, loginFailed, setUserData, setLoginError } from '../authentication/authSlice';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import dataJSON from '../data.json';

export default function LoginLogoutpage() {
	const dispatch = useDispatch();
	// fetch user data on the project itself before anything
	//! this is only for the Netlify demo — JSON Server is used for the actual project
	dispatch(setUserData(dataJSON));
	// for after login redirect
	const navigate = useNavigate();

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const userData = useSelector(state => state.auth.user.users);
	const loginError = useSelector(state => state.auth.loginError);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			checkLogin();
		}
	};

	function checkLogin() {
		let usernameInput = document.getElementById('username').value;
		let passwordInput = document.getElementById('password').value;

		// Find the user w/ correct credentials, if any
		const user = userData.find(user => user.username === usernameInput && user.password === passwordInput);

		if (user) {
			dispatch(login(user));
			dispatch(setLoginError(false));
			// redirect
			navigate('/perfil');
			console.log('Login successful');
		} else {
			dispatch(loginFailed());
			dispatch(setLoginError(true));
			// clean input fields
			document.getElementById('username').value = '';
			document.getElementById('password').value = '';
			console.log('Login failed');
		}
	}

	return (
		<>
			{isAuthenticated ? (
				<>{/* redirecting to profile page as shown above */}</>
			) : (
				<section className='page-extend text-gray-600 body-font bg-gray-100 flex items-center justify-center fadeIn'>
					<div className=' container mx-4 flex px-5 py-24'>
						<div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-4 flex flex-col mx-auto w-full md:mt-0'>
							<h2 className='text-gray-900 text-lg font-medium title-font mb-10'>Login</h2>

							<p className='text-gray-900 font-medium title-font mb-10'>You are currently logged out. Please login below.</p>
							{loginError && <ErrorMessage />}

							<label htmlFor='username' className='leading-7 text-sm text-gray-600'>
								Username
							</label>
							<div className='relative mb-4'>
								<input
									type='text'
									id='username'
									name='username'
									autoFocus
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>
							<label htmlFor='password' className='leading-7 text-sm text-gray-600'>
								Password
							</label>
							<div className='relative mb-4'>
								<input
									type='password'
									id='password'
									name='password'
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									onKeyDown={handleKeyDown}
								/>
							</div>
							<div className='relative'>
								<button className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg' onClick={checkLogin} id='login-btn'>
									🔐 Login
								</button>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}
