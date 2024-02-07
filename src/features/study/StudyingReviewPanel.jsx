import { useSelector, useDispatch } from 'react-redux';
import { nextCard, showAnswer, endStudying, addToWrongCards, resetWrongCards, addToRightCards, resetRightCards } from './studySlice';
import { updateDecks } from '../../authentication/authSlice';
import { useEffect } from 'react';

export default function StudyingReviewPanel() {
	const dispatch = useDispatch();
	//! Id of active deck
	const activeDeckId = useSelector(state => state.study.activeDeck);

	//! user decks
	const userDecks = useSelector(state => state.auth.user.decks);

	// show/hide answer toggle
	const showAnswerToggle = useSelector(state => state.study.showAnswer);

	//! find active deck (by id)
	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);

	// current card index
	const currentCardIndex = useSelector(state => state.study.currentCardIndex);

	//! wrong cards for review
	const wrongCards = useSelector(state => state.study.wrongCards);

	//! right cards for deck removal
	const rightCards = useSelector(state => state.study.rightCards);

	// NEXT CARD HANDLERS
	// !! general

	//! next card handler for all decks
	const handleNextCard = () => {
		// if last card
		if (currentCardIndex == activeDeck.flashcards.length - 1) {
			console.log(rightCards);
			const updatedUserDecks = userDecks.map(deck => {
				// if the deck is the review deck, remove the duplicate wrong cards if any
				// additionally, remove all cards marked as right
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
		} else {
			dispatch(nextCard());
		}
	};

	//! if deck is review deck (card removal)
	const handleDeckRemoval = () => {
		dispatch(addToRightCards(activeDeck.flashcards[currentCardIndex]));
	};

	//! if answer is incorrect (*Review Again*)
	const handleMistake = () => {
		/* duplicates are handled on the handleNextCard function */
		dispatch(addToWrongCards(activeDeck.flashcards[currentCardIndex]));
	};

	// ! UseEffect hook = IMPORTANT FIX
	//? this is needed so that the wrongCards state is updated before the nextCard function is called, otherwise an asyncronism problem would occur and the last flashcard, if marked for review, wouldn't appear in the review deck. Although not the best practice, using useEffect prevents wrong indexing on the nextCard function for the review deck, fixing this.

	useEffect(() => {
		// Check if the wrongCards state is not empty
		if (wrongCards.length > 0 || rightCards.length > 0) {
			// Wait for the state to update before calling the nextCard function
			handleNextCard();
		}
	}, [wrongCards, rightCards]);

	// SHOW ANSWER
	const handleShowAnswer = () => {
		dispatch(showAnswer());
	};

	return (
		<article className='studying-review-panel'>
			<h2>{activeDeck.name}</h2>
			<h2>
				{' '}
				Progress: {currentCardIndex + 1} / {activeDeck.flashcards.length}
			</h2>
			<div className='studying-interface'>
				<article key={activeDeck.flashcards[currentCardIndex].id} className='current-flashcard flipInY'>
					<p className='question'>{activeDeck.flashcards[currentCardIndex].question}</p>
					{showAnswerToggle && <p className='answer fadeIn'>{activeDeck.flashcards[currentCardIndex].answer}</p>}

					<button onClick={handleShowAnswer}>{showAnswerToggle ? 'Hide Answer' : 'Show Answer'}</button>
					{showAnswerToggle && (
						<>
							<button onClick={handleMistake}>Review Again 🔁</button>

							{activeDeck.name === 'Review Flashcards' ? <button onClick={handleDeckRemoval}>Remove Flashcard ✅</button> : <button onClick={handleNextCard}>Correct ✅</button>}
						</>
					)}
				</article>
			</div>
		</article>
	);
}
