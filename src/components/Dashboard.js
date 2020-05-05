import React, { Fragment } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
// import { useStitchAuth } from '../context/auth/StitchAuth';
// import { useContactFunctions } from '../context/contacts/contactContext';
import ContactState from '../context/contacts/ContactState';

const Dashboard = () => {
	// const { currentUser } = useStitchAuth();
	// const contact = ContactState(currentUser.id);
	return (
		<ContactState>
			<Fragment>
				{/* <ContactForm {...contact} />
				<ContactList {...contact} /> */}
				<ContactForm />
				<ContactList />
			</Fragment>
		</ContactState>
	);
};

export default Dashboard;
