import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactState from '../context/contacts/ContactState';
import styled from 'styled-components';

const Dashboard = () => {
	return (
		<ContactState>
			<Body>
				<ContactForm />
				<GridCards>
					<ContactList />
				</GridCards>
			</Body>
		</ContactState>
	);
};

export default Dashboard;

const Body = styled.div`
	margin: 0 auto;
	width: 70%;
	font-family: 'Tinos', serif;
`;

const GridCards = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 4px 4px;
	margin-top: 20px;
	@media (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 4px 4px;
	}
	@media (max-width: 425px) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
`;
