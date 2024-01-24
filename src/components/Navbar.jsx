import { Link } from 'react-router-dom';
import icon from '../assets/icon.svg';

export default function Navbar({ auth }) {
	return (
		<header className='text-gray-600 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
					<img src={icon} className='w-20 h-20 text-white p-4 bg-indigo-500' />
					<span className='ml-1 text-xl'>FlashcardApp</span>
				</a>
				<nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
					<a className='mr-5 hover:text-gray-900'>
						<Link to='/'>Home</Link>
					</a>
					{auth.isAuthenticated ? (
						<>
							<a className='mr-5 hover:text-gray-900'>
								<Link to='/study'>Study</Link>
							</a>
							<a className='mr-5 hover:text-gray-900'>
								<Link to='/perfil'>Perfil</Link>
							</a>
						</>
					) : null}
				</nav>
				<button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
					<Link to='/login'>{auth.isAuthenticated ? 'Logout' : 'Login'}</Link>
					<svg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='w-4 h-4 ml-1' viewBox='0 0 24 24'>
						<path d='M5 12h14M12 5l7 7-7 7'></path>
					</svg>
				</button>
			</div>
		</header>
	);
}
