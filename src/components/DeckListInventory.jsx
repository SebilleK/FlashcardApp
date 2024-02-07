import { useSelector, useDispatch } from 'react-redux';
import { deckSelect } from '../features/study/studySlice';

export default function DeckListInventory() {
    const decks = useSelector(state => state.auth.user.decks);
    const activeDeckId = useSelector(state => state.study.activeDeck);
	const dispatch = useDispatch();

	function handleDeckClick(deckId) {
		console.log(deckId);
		dispatch(deckSelect(deckId));
	}

	return (
		<article className='decks-list-inventory'>
			<ul>
				{decks.map(
					deck =>
						// if deck is the review deck don't display (irrelevant for editing in inventory)
						deck.name !== 'Review Flashcards' && (
							// add a class for styling if the deck is active
							<li onClick={() => handleDeckClick(deck.id)} key={deck.id} className={activeDeckId === deck.id ? 'active-deck' : ''}>
								{deck.name}
							</li>
						),
				)}
			</ul>
		</article>
	);
}
