import { useDispatch, useSelector } from 'react-redux';
import { updateDecks } from '../../authentication/authSlice';
import { setDeckEditing, setNewFlashcardToAdd, clearNewFlashcardsToAdd } from './editSlice';

export default function DeckEdit() {
	const dispatch = useDispatch();
	const activeDeckId = useSelector(state => state.edit.activeDeck);
	const userDecks = useSelector(state => state.auth.user.decks);
	const newFlashcards = useSelector(state => state.edit.newFlashcardsToAdd);

	// find active deck
	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);

	// save the new deck name
	const saveDeckInfo = () => {
		const newName = document.getElementById('deckname').value;
		if (newName === '') {
			// Exit deck editing mode if the deck name is empty
			dispatch(setDeckEditing());
			return;
		}

		// update the deck info and add all the flashcards to it
		const updatedDecks = userDecks.map(deck => {
			if (deck.id === activeDeckId) {
				return {
					...deck,
					name: newName,
					flashcards: [...deck.flashcards, ...newFlashcards], // Add new flashcards to the deck
				};
			} else {
				return deck;
			}
		});

		// update the user decks
		dispatch(updateDecks(updatedDecks));

		// clear new flashcards from the state
		dispatch(clearNewFlashcardsToAdd());

		// exit deck editing mode
		dispatch(setDeckEditing());
	};

	const saveNewFlashcard = () => {
		const newFlashcard = {
			question: document.getElementById('question').value.trim(),
			answer: document.getElementById('answer').value.trim(),
			id: Date.now(),
		};

		// add the new flashcard to the state
		dispatch(setNewFlashcardToAdd(newFlashcard));
		console.log('adding new flashcard:', newFlashcard);
		// clear input fields
		document.getElementById('question').value = '';
		document.getElementById('answer').value = '';
	};

	return (
		<section className='deck-edit-page text-gray-600 body-font bg-gray-100 '>
			<button className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mt-4' onClick={() => dispatch(setDeckEditing())}>
				Go back ↩️
			</button>
			<div className='flex items-center justify-center'>
				<div className='container mx-auto flex px-5 py-12'>
					<div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-4 flex flex-col mx-auto w-full md:mt-0'>
						<h2 className='text-gray-900 text-lg font-medium title-font mb-10'>Edit Deck</h2>

						<label htmlFor='deckname' className='leading-7 text-sm text-gray-600'>
							Deck Name
						</label>
						<div className='relative mb-4'>
							<input
								type='text'
								id='deckname'
								name='deckname'
								placeholder={activeDeck.name}
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>

						<p className='text-gray-900 font-medium title-font mb-4'>Add flashcards:</p>
						<label htmlFor='question' className='leading-7 text-sm text-gray-600'>
							Question
						</label>
						<div className='relative mb-4'>
							<input
								type='text'
								id='question'
								name='question'
								placeholder='Add new question'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<label htmlFor='email' className='leading-7 text-sm text-gray-600'>
							Answer
						</label>
						<div className='relative mb-4'>
							<input
								type='answer'
								id='answer'
								name='answer'
								placeholder='Add new answer'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='save-deck-btns mb-4 mt-4'>
							<button onClick={saveNewFlashcard} className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
								Add Flashcard ➕
							</button>
							<button onClick={saveDeckInfo} className='text-white bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
								Save Changes ✅
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
