import { useSelector, useDispatch } from 'react-redux';
import DeckListInventory from './DeckListInventory';
import { updateDecks } from '../authentication/authSlice';
import { setDeckEditing, setFlashcardEditing, setActiveFlashcard, setActiveDeck, setDeckCreating } from '../features/edit/editSlice';
import FlashcardEdit from '../features/edit/FlashcardEdit';
import DeckEdit from '../features/edit/DeckEdit';
import DeckCreate from '../features/edit/DeckCreate';

export default function InventoryPage() {
	const dispatch = useDispatch();
	//get user decks and active deck id
	const userDecks = useSelector(state => state.auth.user.decks);
	const activeDeckId = useSelector(state => state.study.activeDeck);
	// find active deck
	const activeDeck = userDecks.find(deck => deck.id === activeDeckId);
	// is editing/creating deck or editing flashcard
	const isFlashcardEditing = useSelector(state => state.edit.isFlashcardEditing);
	const isDeckEditing = useSelector(state => state.edit.isDeckEditing);
	const isDeckCreating = useSelector(state => state.edit.isDeckCreating);

	//! edit and delete existing flashcards per deck
	const handleEditFlashcard = flashcardId => {
		console.log(flashcardId, 'edit');
		// set the active flashcard and open the edit flashcard menu
		dispatch(setActiveFlashcard(flashcardId));
		dispatch(setFlashcardEditing());
	};

	const handleDeleteFlashcard = flashcardId => {
		console.log(flashcardId, 'delete');

		// all decks have at least 1 flashcard
		if (activeDeck.flashcards.length === 1) {
			console.log('cannot delete last flashcard');
		} else {
			// find the flashcard to be deleted and remove it from the current deck
			const updatedDeck = activeDeck.flashcards.filter(flashcard => flashcard.id !== flashcardId);
			// update the user decks with the newly updated deck
			const updatedDecks = userDecks.map(deck => {
				if (deck.id === activeDeckId) {
					return {
						...deck,
						flashcards: updatedDeck,
					};
				} else {
					return deck;
				}
			});
			// update the user decks
			dispatch(updateDecks(updatedDecks));
		}
	};

	//! create, edit and delete decks (all created decks need at least 1 flashcard)
	const handleDeleteDeck = deckId => {
		console.log(deckId, 'delete');
		// there needs to be at least 1 deck (2, considering there's always the review deck, hidden or not)
		if (userDecks.length === 2) {
			console.log('At least one deck is required');
		} else {
			// remove selected deck from user decks by id
			const newDecks = userDecks.filter(deck => deck.id !== activeDeckId);
			// update the user decks with the newly created variable (filtered decks)
			dispatch(updateDecks(newDecks));
		}
	};

	const handleEditDeck = deckId => {
		console.log(deckId, 'edit');
		dispatch(setActiveDeck(deckId));
		dispatch(setDeckEditing());
	};

	const handleCreateDeck = () => {
		console.log('create deck');
		dispatch(setDeckCreating());
	};

	// check window width to show prompt
	const isSmallScreen = window.innerWidth < 600;

	return (
		<>
			<section className='inventorypage page-extend text-gray-600 bg-gray-100 body-font fadeIn'>
				{isDeckEditing ? (
					// deck edit form page
					<DeckEdit />
				) : isDeckCreating ? (
					// deck create form page
					<DeckCreate />
				) : (
					<>
						<h1 className='title-font sm:text-4xl text-3xl mb-1 py-8 font-medium text-gray-900 text-center'>Inventory </h1>
						<h2 className='title-font sm:text-2xl text-1xl mb-4 font-medium text-gray-900 text-center '>Edit your decks and flashcards</h2>

						<div className='deck-control-btns'>
							<button onClick={handleCreateDeck} className='create-deck-btn'>
								Create New Deck
							</button>
							{activeDeck ? (
								<>
									<button onClick={() => handleEditDeck(activeDeckId)} className='edit-deck-btn'>
										Edit Selected Deck
									</button>
									<button onClick={handleDeleteDeck} className='delete-deck-btn'>
										Delete Selected Deck
									</button>
								</>
							) : (
								<h3 className='text-center'>No deck selected</h3>
							)}
						</div>
						{isSmallScreen ? <p className='text-center text-red-500 mt-4 font-medium'>To browse, edit and/or delete existing decks/flashcards please use a larger device.</p> : null}
						<div className='hide-in-small-screen container-for-inventory'>
							{isFlashcardEditing ? <FlashcardEdit /> : null}
							<div className='deck-fashcards-container flex items-center justify-center py-12'>
								<div className='grid flex-grow h-32 card bg-base-300 rounded-box place-items-center'>
									<DeckListInventory />
								</div>

								<div className='hide-in-small-screen grid flex-grow h-32 card bg-base-300 rounded-box place-items-center p-4'>
									{activeDeck ? (
										<table className='tabela-inventory'>
											<thead>
												<tr className=''>
													<th className=''>Flashcard Id</th>
													<th className=''>Question</th>
													<th className=''>Answer</th>
													<th className=''>Deck</th>
													<th className=''>✎</th>
													<th className=''>🗑️</th>
												</tr>
											</thead>
											<tbody>
												{activeDeck.flashcards.map(flashcard => (
													<tr key={flashcard.id} className='border-t'>
														<td className=''>{flashcard.id}</td>
														<td className=''>{flashcard.question}</td>
														<td className=''>{flashcard.answer}</td>
														<td className=''>{activeDeck.name}</td>
														<td className=''>
															<button
																onClick={() => handleEditFlashcard(flashcard.id)}
																className='inline-flex text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-lg'
															>
																Edit
															</button>
														</td>
														<td>
															<button
																onClick={() => handleDeleteFlashcard(flashcard.id)}
																className='inline-flex text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-lg'
															>
																Delete
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									) : (
										<p className='font-medium text-lg'>Please select a deck to edit</p>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</section>
		</>
	);
}
