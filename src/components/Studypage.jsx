import DeckList from './DeckList';
import ReviewArea from './ReviewArea';
import { startStudying, endStudying, resetWrongCards, resetRightCards } from '../features/study/studySlice';
import { updateDecks } from '../authentication/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Studypage() {
	const dispatch = useDispatch();
	//! user decks
	const userDecks = useSelector(state => state.auth.user.decks);
	//! wrong cards for review
	const wrongCards = useSelector(state => state.study.wrongCards);
	//! right cards for deck removal
	const rightCards = useSelector(state => state.study.rightCards);
	//! is studying
	const isStudying = useSelector(state => state.study.isStudying);

	// handle end studying separately to still add wrong cards if it is ended early.
	const handleStudyEnd = () => {
		const updatedUserDecks = userDecks.map(deck => {
			// if the deck is the review deck, remove the duplicate wrong cards if any
			// additionally, remove all cards marked as right!!
			//! this logic is copied from the StudyingReviewPanel
			if (deck.name === 'Review Flashcards') {
				const uniqueWrongCards = wrongCards.filter(wrongCard => !deck.flashcards.some(card => card.id === wrongCard.id));
				const removeRightCards = deck.flashcards.filter(card => !rightCards.some(rightCard => card.id === rightCard.id));

				return {
					...deck,
					flashcards: [...removeRightCards, ...uniqueWrongCards],
				};
			} else {
				return deck;
			}
		});

		dispatch(updateDecks(updatedUserDecks));
		dispatch(resetWrongCards());
		dispatch(resetRightCards());
		dispatch(endStudying());
	};

	return (
		<section className='studypage fadeIn'>
			<h1>Study</h1>
			<div className='control-btns'>
				<button onClick={() => dispatch(startStudying())} className='start-btn'>
					Start
				</button>
				<button onClick={handleStudyEnd} className='end-btn'>
					End
				</button>
			</div>
			<div className='study-container'>
				<article className='study-review'>
					<ReviewArea />
				</article>{' '}
				{isStudying ? (
					''
				) : (
					<>
						<article className='study-decks'>
							<h2>Decks</h2>
							<DeckList />
						</article>
					</>
				)}{' '}
			</div>
		</section>
	);
}
