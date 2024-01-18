import { useSelector } from 'react-redux';
import StudyingReviewPanel from '../features/study/StudyingReviewPanel';
export default function ReviewArea() {
	const activeDeckId = useSelector(state => state.study.activeDeck);
	const userDecks = useSelector(state => state.auth.user.decks);
	const isStudying = useSelector(state => state.study.isStudying);

	// finding the deck to study with the active deck id

	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);

	// if active studying, return other component possibly...(TO ADD)

	if (activeDeck && isStudying) {
		return <StudyingReviewPanel />;
	} else if (activeDeck) {
		return (
			<>
				<article className='review-area'>
					<p>{activeDeck.name}</p>
					<p>Flashcards: {activeDeck.flashcards.length} </p>
					<ul>
						{activeDeck.flashcards.map(flashcard => (
							<li key={flashcard.id}>
								{flashcard.question}: {flashcard.answer}
							</li>
						))}
					</ul>
				</article>
			</>
		);
	} else {
		return (
			<article className='review-area'>
				{' '}
				<p>Please select a deck to study 👉</p>
			</article>
		);
	}
}
