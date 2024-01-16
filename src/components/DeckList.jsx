import { useSelector, useDispatch } from 'react-redux';
import { deckSelect } from '../features/study/studySlice';

export default function DeckList() {
	const decks = useSelector(state => state.auth.user.decks);
	const dispatch = useDispatch();

	function handleDeckClick(deckId) {
		console.log(deckId);
		dispatch(deckSelect(deckId));
	}

	return (
		<article className='decks-list'>
			<ul>
				{decks.map(deck => (
					<li onClick={() => handleDeckClick(deck.id)} key={deck.id}>
						{deck.name}
					</li>
				))}
			</ul>
		</article>
	);
}
