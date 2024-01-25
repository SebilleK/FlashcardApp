import { useSelector } from 'react-redux';
export default function Perfilpage() {
	const user = useSelector(state => state.auth.user);

	return (
		<section class='text-gray-600 body-font bg-gray-100'>
			<div class='container px-5 py-24 mx-auto'>
				<div class='flex flex-col text-center w-full mb-20 border-2 border-blue-500 p-8 rounded-lg'>
					<h1 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>Profile</h1>
					<div class='py-2'>
						<img class='mx-auto w-20 h-20 mb-10 rounded-full' src='https://via.placeholder.com/150' alt='User Profile Image' />

						<p class='mb-4 leading-relaxed text-lg'>
							Welcome, <span id='username'>{user.username}</span>! Your currently registered email is <span id='email'>{user.email}</span>, and you currently have{' '}
							<span id='deckCount'>{user.decks.length}</span> decks.
						</p>
						<p class='mb-4 leading-relaxed text-lg'>
							<button className='inline-flex text-white bg-blue-500 border-0 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'> Edit Profile</button>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
