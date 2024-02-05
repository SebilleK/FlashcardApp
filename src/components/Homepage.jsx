import IntroPic from '../assets/intropic.jpg';
import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<section className='page-extend text-gray-600 bg-gray-100 body-font fadeIn'>
			<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
				<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0'>
					<img className='object-cover object-center rounded border' loading='lazy' alt='hero' src={IntroPic} />
				</div>
				<div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
					<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
						Flashcard App
						<br className='hidden lg:inline-block' />
					</h1>
					<p className='mb-4 leading-relaxed text-lg text-gray-900'>
						Hello and welcome to FlashcardApp. Here you can study your own short flashcard decks to easily remember new information: be it vocabulary, math formulas, trivia, etc. 📚
						{/* <br className='hidden lg:inline-block' />
						Login below and start learning! 📖 */}
					</p>
					{/* 					<div className='flex justify-center'>
						<button className='inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
							<Link to='/login'>Login </Link>
						</button>
					</div> */}
					<p className='  mb-4 leading-relaxed text-lg text-gray-900 '>Create your own decks, start learning & review the flashcards you missed! 🔎</p>
				</div>
			</div>
		</section>
	);
}
