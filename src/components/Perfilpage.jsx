import { useSelector, useDispatch } from 'react-redux';
import { startEditing } from '../features/edit/editSlice';
import ProfileEdit from '../features/edit/ProfileEdit';

export default function Perfilpage() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const isEditing = useSelector(state => state.edit.isEditing);

	const editHandler = () => {
		dispatch(startEditing());
	};

	return (
		<section className='text-gray-600 body-font bg-gray-100 fadeIn'>
			{isEditing ? (
				<ProfileEdit />
			) : (
				<div className='container mx-auto flex px-5 py-12'>
					<div className='flex flex-col text-center w-full mb-5 mt-5 border-2 border-slate-500 py-12 rounded-lg bg-white shadow-100'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>Profile</h1>
						<div className='py-2'>
							<img className='mx-auto w-150 h-150 mb-10 rounded-full' src='https://via.placeholder.com/150' alt='User Profile Image' />

							<p className='mb-4 leading-relaxed text-lg'>
								Welcome, <span id='username'>{user.username}</span>! <br /> Your currently registered email is <span id='email'>{user.email}</span>, and you currently have{' '}
								<span id='deckCount'>{user.decks.length}</span> decks. <br />
								Edit this information below.
							</p>
							<p className='mb-4 leading-relaxed text-lg'>
								<button className='inline-flex text-white bg-blue-500 border-0 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg' onClick={editHandler}>
									Edit Profile
								</button>
							</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
