import { useSelector, useDispatch } from 'react-redux';
import { nextCard, showAnswer, endStudying } from './studySlice';
export default function StudyingReviewPanel() {
	const dispatch = useDispatch();
	// get Id of active deck + user decks
	const activeDeckId = useSelector(state => state.study.activeDeck);
	const userDecks = useSelector(state => state.auth.user.decks);
	// show/hide answer toggle
	const showAnswerToggle = useSelector(state => state.study.showAnswer);

	// find active deck
	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);

	// current card index
	const currentCardIndex = useSelector(state => state.study.currentCardIndex);

	// next card
	const handleNextCard = () => {
		if (currentCardIndex >= activeDeck.flashcards.length - 1) {
			dispatch(endStudying());
		} else {
			dispatch(nextCard());
		}
	};

	// next card w/ handle mistake
	const handleMistake = () => {
		/* logic to handle mistake */
		handleNextCard();
	};

	// show answer
	const handleShowAnswer = () => {
		dispatch(showAnswer());
	};

	return (
		<article className='studying-review-panel'>
			<h2>{activeDeck.name}</h2>
			<div className='studying-interface'>
				<p className='question'>{activeDeck.flashcards[currentCardIndex].question}</p>
				{showAnswerToggle && <p className='answer'>{activeDeck.flashcards[currentCardIndex].answer}</p>}

				<button onClick={handleShowAnswer}>{showAnswerToggle ? 'Hide Answer' : 'Show Answer'}</button>
				{showAnswerToggle && (
					<>
						<button onClick={handleMistake}>Rever Novamente 🔁</button>
						<button onClick={handleNextCard}>Certo ✅</button>{' '}
					</>
				)}

				{/* <button onClick={handleNextCard}>Next Card</button> */}
			</div>
		</article>
	);
}
