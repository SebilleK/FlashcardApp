import DeckList from './DeckList';
import ReviewArea from './ReviewArea';
import { startStudying, endStudying } from '../features/study/studySlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Studypage() {
	const dispatch = useDispatch();

	return (
		<section className='studypage'>
			<h1>Study</h1>
			<div className='control-btns'>
				<button onClick={() => dispatch(startStudying())} className='start-btn'>Start</button>
				<button onClick={() => dispatch(endStudying())} className='end-btn'>End</button>
			</div>
			<div className='study-container'>
				<article className='study-review'>
					<h2>Review</h2>
					<ReviewArea />
				</article>
				<article className='study-decks'>
					<h2>Decks</h2>
					<DeckList />
				</article>
			</div>
		</section>
	);
}
