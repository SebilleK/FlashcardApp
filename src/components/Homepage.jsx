import IntroPic from '../assets/intropic.jpg';
import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<section className='homepage'>
			<h1>Homepage</h1>
			<div className='intro'>
				<img src={IntroPic} alt='' />
				<div className='intro-info'>
					<p>Hello and welcome to FlashcardApp. Here you can study your own short flashcard decks to easily remember new information, be it vocabulary, math formulas, trivia, etc. 📚</p>
					<p>
						<Link to='/login'>
							<a href=''>Login</a>
						</Link>{' '}
						and start learning!📖
					</p>
				</div>
			</div>
		</section>
	);
}
