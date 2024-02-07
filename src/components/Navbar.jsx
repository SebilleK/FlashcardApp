import { Link } from 'react-router-dom';
import icon from '../assets/icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../authentication/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ auth }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authState = useSelector(state => state.auth.isAuthenticated);

	// to avoid blank page on logout (user could be on a auth only page) => use redirection (navigate)
	const handleLogClick = () => {
		if (authState) {
			dispatch(logout());
			navigate('/');
		} else {
			navigate('/login');
		}
	};

	return (
		<header className='text-gray-600 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
					<img src={icon} className='w-20 h-20 text-white p-4' />

					<span className='ml-1 text-xl'>FlashcardApp</span>
				</a>
				<nav className='navbar md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
					<a className='mr-5 hover:text-gray-900'>
						<Link to='/'>Home</Link>
					</a>
					{auth.isAuthenticated ? (
						<>
							<a className='mr-5 hover:text-gray-900'>
								<Link to='/study'>Study</Link>
							</a>
							<a className='mr-5 hover:text-gray-900'>
								<Link to='/inventory'>Inventory</Link>
							</a>
							<a className='mr-5 hover:text-gray-900'>
								<Link to='/perfil'>Profile</Link>
							</a>
						</>
					) : null}
				</nav>
				<button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0' onClick={handleLogClick}>
					<Link to='/login'>{auth.isAuthenticated ? 'Logout' : 'Login'}</Link>
					<svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='w-4 h-4 ml-1' viewBox='0 0 24 24'>
						<path d='M5 12h14M12 5l7 7-7 7'></path>
					</svg>
				</button>
			</div>
		</header>
	);
}
