import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

function App() {
	const auth = useSelector(state => state.auth);

	return (
		<>
			<Navbar auth={auth} />
		</>
	);
}

export default App;
