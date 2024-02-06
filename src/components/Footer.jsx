export default function Footer() {
	return (
		<footer className='footer text-gray-600 body-font'>
			<div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
				<p className='text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-2 mb-2'>
					© 2024 FlashcardApp —
					<a href='https://github.com/SebilleK' className='text-gray-600 ml-1' rel='noopener noreferrer' target='_blank'>
						@SebilleK
					</a>
					<br />
					This app was created as part of a frontend development course. You can visit its GitHub repository
					<a href='https://github.com/SebilleK/FlashcardApp' className='text-gray-600 ml-2' rel='noopener noreferrer' target='_blank'>
						{' '}
						here.
					</a>
				</p>
			</div>
		</footer>
	);
}
