import React from 'react';
import { StitchAuthProvider, useStitchAuth } from './context/auth/StitchAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
	return (
		<StitchAuthProvider>
			<AppUI />
		</StitchAuthProvider>
	);
}

function AppUI() {
	const {
		isLoggedIn,
		actions: { handleLogout },
	} = useStitchAuth();
	return (
		<div>
			<nav>
				{isLoggedIn && <button onClick={handleLogout}>Logout</button>}
				<h1>Phonebook Stitch </h1>
			</nav>
			{isLoggedIn ? <Dashboard /> : <Login />}
		</div>
	);
}
