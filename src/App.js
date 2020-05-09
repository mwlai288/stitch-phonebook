import React from 'react';
import { StitchAuthProvider, useStitchAuth } from './context/auth/StitchAuth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
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
				<Container>
					<Navbar.Brand>
						<Title>Stitch Phonebook</Title>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							{isLoggedIn && <button onClick={handleLogout}>Logout</button>}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			{isLoggedIn ? <Dashboard /> : <Login />}
		</div>
	);
}

const Title = styled.span`
	color: #fff;
`;
