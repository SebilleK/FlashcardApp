import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './components/Homepage.jsx';
import Study from './components/Studypage.jsx';
import LoginLogoutpage from './components/LoginLogoutpage.jsx';
import Perfil from './components/Perfilpage.jsx';
import InventoryPage from './components/InventoryPage.jsx';

/* Routing */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* Redux */
import { Provider } from 'react-redux';
import store from './app/store.js';

/* Styling */
/* Personalized: here | Tailwind: linked in index.html */
import './css/study.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />}>
						<Route index element={<Home />} />
						<Route path='study' element={<Study />} />
						<Route path='login' element={<LoginLogoutpage />} />
						<Route path='perfil' element={<Perfil />} />
						<Route path='inventory' element={<InventoryPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
