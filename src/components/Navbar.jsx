import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/study'>Study</Link>
				<Link to='/login'>Login</Link>
			</nav>
			<Outlet />
		</>
	);
}
