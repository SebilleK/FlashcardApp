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

	{
		/* <h1>Welcome!😸</h1>
					<div className='login-info'>
						<p>You are currently logged in.</p>
						<p>
							Check out your <Link to='/perfil'>profile</Link>, <Link to='/study'>study</Link> or log out below.
						</p>
					</div>
					<button className='logout-btn' onClick={() => dispatch(logout())}>
						↩️ Logout
					</button> */
	}
	{
		/* <h1>Login</h1>
					<form action='' className='login-form'>
						<label htmlFor='username'>Username</label>
						<input type='text' name='username' id='username' />
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' id='password' />
						<button className='login-btn' type='button' onClick={checkLogin}>
							🔐 Login
						</button>
					</form>
					{loginError && <p className='error-message'>Login failed. Please check your credentials and try again.</p>} */
	}

	return (
		<>
			{isAuthenticated ? (
				<>
					<section class='text-gray-600 body-font bg-gray-100 min-h-screen flex items-center justify-center'>
						<div class='container mx-auto flex px-5 py-24'>
							<div class='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full md:mt-0'>
								<h2 class='text-gray-900 text-lg font-medium title-font mb-10'>Logout</h2>
								<p class='text-gray-900 font-medium title-font mb-10'>You are currently logged in.</p>
								<p class='text-gray-900 font-medium title-font mb-10'>
									Check out your <Link to='/perfil'>profile</Link>, <Link to='/study'>study</Link> or log out below.
								</p>

								<div class='relative mb-4'>
									<button class='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg' onClick={() => dispatch(logout())}>
										↩️ Logout
									</button>
								</div>

								{loginError && <p class='text-red-500'>Login failed. Please check your credentials and try again.</p>}
							</div>
						</div>
					</section>
				</>
			) : (
				<section class='text-gray-600 body-font bg-gray-100 min-h-screen flex items-center justify-center'>
					<div class='container mx-auto flex px-5 py-24'>
						<div class='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full md:mt-0'>
							<h2 class='text-gray-900 text-lg font-medium title-font mb-10'>Login</h2>
							<p class='text-gray-900 font-medium title-font mb-10'>You are currently logged out. Please login below.</p>

							<label for='username' class='leading-7 text-sm text-gray-600'>
								Username
							</label>
							<div class='relative mb-4'>
								<input
									type='text'
									id='username'
									name='username'
									class='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>
							<label for='password' class='leading-7 text-sm text-gray-600'>
								Password
							</label>
							<div class='relative mb-4'>
								<input
									type='password'
									id='password'
									name='password'
									class='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>
							<div class='relative mb-4'>
								<button class='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg' onClick={checkLogin}>
									🔐 Login
								</button>
							</div>

							{loginError && <p>Login failed. Please check your credentials and try again.</p>}
						</div>
					</div>
				</section>
			)}
		</>
	);
}
