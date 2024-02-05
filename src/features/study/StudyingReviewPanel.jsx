import { useSelector, useDispatch } from 'react-redux';
import { nextCard, showAnswer, endStudying, addToWrongCards, resetWrongCards, addToRightCards, resetRightCards } from './studySlice';
import { updateDecks } from '../../authentication/authSlice';
import { useEffect } from 'react';

export default function StudyingReviewPanel() {
	const dispatch = useDispatch();
	//! Id of active deck
	const activeDeckId = useSelector(state => state.study.activeDeck);
	/* TROUBLESHOOTING WITH SELECTORS — user.decks works */
	/* const userDecks = useSelector(state => state.auth.userDecks);  */

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

	// review deck (found by name)
	/* 	const reviewDeck = userDecks.find(deck => deck.name === 'Review Flashcards'); */

	// NEXT CARD HANDLERS
	// !! general

	// !? PROBLEM 1* A última carta não aparece no deck de review se adicionada a ele. problema de assincronismo ? da
	// !? condição do if? console logs para tentar determinar o problema.
	//! FIXED. SEE USEEFFECT BELOW.

	//! next card handler for all decks
	const handleNextCard = () => {
		// if last card
		if (currentCardIndex == activeDeck.flashcards.length - 1) {
			console.log(rightCards);
			const updatedUserDecks = userDecks.map(deck => {
				// if the deck is the review deck, remove the duplicate wrong cards if any
				// additionally, remove all cards marked as right!!
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

	// !! if deck is review deck (card removal)
	const handleDeckRemoval = () => {
		dispatch(addToRightCards(activeDeck.flashcards[currentCardIndex]));
	};

	// !! if answer is incorrect (*rever novamente*)
	const handleMistake = () => {
		/* logic to handle mistake */
		/* duplicates are handles on the nextcard function */

		dispatch(addToWrongCards(activeDeck.flashcards[currentCardIndex]));
	};

	// ! UseEffect hook = FIX FOR PROBLEM 1*
	//? this is needed so that the wrongCards state is updated before the nextCard function is called, it's an asyncronism problem. additionally, it prevents wrong indexing on the nextCard function for the review deck (soo the
	//? right cards array also works for card removal after)
	useEffect(() => {
		// Check if the wrongCards state is not empty!!
		if (wrongCards.length > 0 || rightCards.length > 0) {
			// Wait for the state to update!!
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
				<article className='current-flashcard'>
					<p className='question'>{activeDeck.flashcards[currentCardIndex].question}</p>
					{showAnswerToggle && <p className='answer'>{activeDeck.flashcards[currentCardIndex].answer}</p>}

					<button onClick={handleShowAnswer}>{showAnswerToggle ? 'Hide Answer' : 'Show Answer'}</button>
					{showAnswerToggle && (
						<>
							<button onClick={handleMistake}>Review Again 🔁</button>

							{activeDeck.name === 'Review Flashcards' ? <button onClick={handleDeckRemoval}>Remove Flashcard ✅</button> : <button onClick={handleNextCard}>Correct ✅</button>}
						</>
					)}
				</article>

				{/* <button onClick={handleNextCard}>Next Card</button> */}
			</div>
		</article>
	);
}
