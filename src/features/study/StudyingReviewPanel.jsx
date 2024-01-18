import { useSelector, useDispatch } from 'react-redux';

export default function StudyingReviewPanel() {
	const activeDeckId = useSelector(state => state.study.activeDeck);
	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);


	return (
		<article className='studying-review-panel'>
			<h2>Currently Studying {activeDeck.name}</h2>

			<p>Test paragraph</p>
		</article>
	);
}
