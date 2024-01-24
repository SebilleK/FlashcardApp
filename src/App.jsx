import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function App() {
	const auth = useSelector(state => state.auth);

	return (
		<main>
			<Navbar auth={auth} />
			<Outlet />
			<Footer />
		</main>
	);
}

export default App;
