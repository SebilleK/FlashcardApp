import { setFlashcardEditing } from '../edit/editSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateDecks } from '../../authentication/authSlice';

export default function FlashcardEdit() {
	const dispatch = useDispatch();
	const isFlashcardEditing = useSelector(state => state.edit.isFlashcardEditing);

	// active flashcard id and active user deck id
	const activeFlashcard = useSelector(state => state.edit.activeFlashcard);
	const activeDeckId = useSelector(state => state.study.activeDeck);
	const userDecks = useSelector(state => state.auth.user.decks);

	// finding the flashcard to edit (by first identifying the deck and then the flashcard on it through the ids)
	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);
	const flashcardToEdit = activeDeck.flashcards.find(flashcard => flashcard.id === activeFlashcard);

	//!! input control & save changes
	const handleSave = () => {
		/* console.log(flashcardToEdit); */

		// check if inputs are valid
		const questionInput = document.getElementById('question').value.trim();
		const answerInput = document.getElementById('answer').value.trim();
		// if either question or answer is empty after trimming, don't save, just leave the menu
		if (questionInput === '' || answerInput === '') {
			dispatch(setFlashcardEditing());
			return;
		}

		// create a copy to save your changes (so that you can modify the properties of the object
		// without modifying the original object and interfer with the redux state)
		const updatedFlashcard = { ...flashcardToEdit };

		// save the changes temporarily in the flashcard copy
		updatedFlashcard.question = questionInput;
		updatedFlashcard.answer = answerInput;

		// update the flashcard in the database
		deckUpdater(updatedFlashcard);

		// close edit flashcard menu
		dispatch(setFlashcardEditing());
	};

	//!! update the flashcard in the database (through the decks state)
	const deckUpdater = updatedFlashcard => {
		// update the flashcard with a new decks array
		const updatedDecks = userDecks.map(deck => {
			if (deck.id === activeDeckId) {
				// Create a copy of the deck (deep copy!)
				const updatedDeck = { ...deck, flashcards: [...deck.flashcards] };

				// Find the index of the flashcard to update
				const flashcardIndex = updatedDeck.flashcards.findIndex(flashcard => flashcard.id === activeFlashcard);

				if (flashcardIndex !== -1) {
					// Update the flashcard within the deck copy
					updatedDeck.flashcards[flashcardIndex] = updatedFlashcard;
				}

				return updatedDeck;
			}

			return deck;
		});

		// update the decks in the Redux store
		dispatch(updateDecks(updatedDecks));
	};

	return (
		<>
			<div className='flashcard-edit-form bg-white p-8 rounded shadow-md max-w-md w-full'>
				<h2 className='text-2xl font-bold mb-4'>Edit Flashcard</h2>

				<div className='mb-4'>
					<label htmlFor='question' className='block text-gray-700 font-semibold mb-2'>
						Question:
					</label>
					<input
						autoFocus
						type='text'
						id='question'
						name='question'
						className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
						placeholder={flashcardToEdit.question}
						required
					/>
				</div>

				<div class='mb-6'>
					<label htmlFor='answer' className='block text-gray-700 font-semibold mb-2'>
						Answer:
					</label>
					<input type='text' id='answer' name='answer' className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' placeholder={flashcardToEdit.answer} required />
				</div>
				<div className='flashcard-edit-buttons flex'>
					<button type='button' onClick={() => dispatch(setFlashcardEditing())} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
						Cancel ❌
					</button>
					<button type='submit' onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
						Submit ✅
					</button>
				</div>
			</div>
		</>
	);
}
