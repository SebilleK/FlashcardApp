import { useDispatch, useSelector } from 'react-redux';
import { stopEditing, setAlert } from '../edit/editSlice';
import { setUserData } from '../../authentication/authSlice';
import ErrorMessage from '../../components/ErrorMessage';

export default function ProfileEdit() {
	const dispatch = useDispatch();

	const user = useSelector(state => state.auth.user);
	const alert = useSelector(state => state.edit.alert);
	const handleSave = () => {
		const newUsername = document.getElementById('username').value;
		const newEmail = document.getElementById('email').value;

		// Check if inputs are valid
		if (newUsername.length < 3) {
			dispatch(setAlert());
			return;
		}

		if (!newEmail.includes('@') || !newEmail.includes('.')) {
			dispatch(setAlert());
			alert('Please enter a valid email address.');
			return;
		}

		// Update user data
		const updatedUserData = {
			...user, // avoid overwriting the original user object with just the 2 values
			username: newUsername,
			email: newEmail,
		};

		dispatch(setUserData(updatedUserData));

		dispatch(stopEditing());
	};

	const backHandler = () => {
		dispatch(stopEditing());

		if (alert) {
			dispatch(setAlert());
		}

		console.log('Back button clicked');
	};

	return (
		<>
			<section className='text-gray-600 body-font bg-gray-100 '>
				<button className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mt-4' onClick={backHandler}>
					Go back ↩️
				</button>
				<div className='flex items-center justify-center'>
					<div className='container mx-auto flex px-5 py-12'>
						<div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-4 flex flex-col mx-auto w-full md:mt-0'>
							<h2 className='text-gray-900 text-lg font-medium title-font mb-10'>Edit Profile</h2>
							<p className='text-gray-900 font-medium title-font mb-10'>Please input your new username and email.</p>
							{alert && <ErrorMessage />}

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
							<label htmlFor='email' className='leading-7 text-sm text-gray-600'>
								Email
							</label>
							<div className='relative mb-4'>
								<input
									type='email'
									id='email'
									name='email'
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>
							<div className='relative mb-4'>
								<button className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg' onClick={handleSave}>
									Save ✏
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
