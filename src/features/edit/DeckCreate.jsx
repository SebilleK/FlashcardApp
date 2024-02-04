import { useDispatch, useSelector } from 'react-redux';
import { setDeckCreating, savedModificationsAlertChange } from './editSlice';
import { updateDecks } from '../../authentication/authSlice';
import ErrorMessage from '../../components/ErrorMessage';

export default function DeckCreate() {
	const dispatch = useDispatch();
	const userDecks = useSelector(state => state.auth.user.decks);
	const newFlashcards = useSelector(state => state.edit.newFlashcardsToAdd);
	const savedModificationsAlert = useSelector(state => state.edit.savedModificationsAlert);

	// save on enter
	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			saveDeckInfo();
		}
	};

	// save the new deck and add test flashcard to it
	const saveDeckInfo = () => {
		const newDeckName = document.getElementById('deckname').value;

		// name cannot be empty + don't allow more than 15 decks
		if (newDeckName === '' || userDecks.length > 15) {
			return;
		}

		const newDeck = {
			name: newDeckName,
			category: '',
			flashcards: [
				{
					question: 'Test Question',
					answer: 'Test Answer',
					id: Date.now() + 1,
				},
			],
			id: Date.now(),
		};

		const updatedDecks = [...userDecks, newDeck];

		// update the user decks and reset the input
		dispatch(updateDecks(updatedDecks));
		// set success message
		dispatch(savedModificationsAlertChange());
		// clean input fields
		document.getElementById('deckname').value = '';
	};

	return (
		<section className='deck-edit-page text-gray-600 body-font bg-gray-100 '>
			<button className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mt-4' onClick={() => dispatch(setDeckCreating())}>
				Go back ↩️
			</button>

			<div className='flex items-center justify-center'>
				<div className='container mx-auto flex px-5 py-12'>
					<div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-4 flex flex-col mx-auto w-full md:mt-0'>
						<h2 className='text-gray-900 text-lg font-medium title-font mb-10'>Create New Deck</h2>
						{savedModificationsAlert && <ErrorMessage />}

						<label htmlFor='deckname' className='leading-7 text-sm text-gray-600'>
							Deck Name
						</label>
						<div className='relative mb-4'>
							<input
								type='text'
								id='deckname'
								name='deckname'
								autoFocus
								onKeyDown={handleKeyDown}
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>

						<button onClick={saveDeckInfo} className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
							Create Deck ✅
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
