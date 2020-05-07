import React from 'react';
import { StitchAuthProvider, useStitchAuth } from './context/auth/StitchAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

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
			<Navbar expand="md" bg="dark">
				<Navbar.Brand>
					<Title>Stitch Phonebook</Title>
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						{isLoggedIn && <button onClick={handleLogout}>Logout</button>}
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>

			{isLoggedIn ? <Dashboard /> : <Login />}
		</div>
	);
}
// {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
const Title = styled.span`
	color: #fff;
`;
