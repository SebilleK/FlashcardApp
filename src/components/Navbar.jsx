import { Outlet, Link } from 'react-router-dom';

export default function Navbar({ auth }) {
	return (
		<>
			<nav>
				<Link to='/'>Home</Link>
				{auth.isAuthenticated ? (
					<>
						<Link to='/study'>Study</Link> <Link to='/perfil'>Perfil</Link>
					</>
				) : null}
				<Link to='/login'>Login</Link>
			</nav>
			<Outlet />
		</>
	);
}
