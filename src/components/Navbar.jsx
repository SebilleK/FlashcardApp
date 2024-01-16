import { Link } from 'react-router-dom';

export default function Navbar({ auth }) {
	return (
		<div className='navbar'>
			<h1>FlashcardApp</h1>
			<nav>
				<Link to='/'>Home</Link>
				{auth.isAuthenticated ? (
					<>
						<Link to='/study'>Study</Link> <Link to='/perfil'>Perfil</Link>
					</>
				) : null}
				<Link to='/login'>{auth.isAuthenticated ? 'Logout' : 'Login'}</Link>
			</nav>
		</div>
	);
}
