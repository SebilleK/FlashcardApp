import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './components/Homepage.jsx';
import Study from './components/Studypage.jsx';
import Login from './components/Loginpage.jsx';

/* Routing */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<Home />} />
					<Route path='study' element={<Study />} />
					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
