import React, { useEffect, useContext, Fragment } from 'react';
import ContactContext from '../context/contacts/contactContext';
import Spinner from 'react-bootstrap/Spinner';
import ContactItem from './ContactItem';

const ContactList = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, loadContacts, loading } = contactContext;

	useEffect(() => {
		loadContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				contacts.map((contact) => (
					<ContactItem key={contact._id.toString()} contact={contact} />
				))
			) : (
				<div>
					<Spinner animation="grow" variant="secondary" />
					<Spinner animation="grow" variant="secondary" />
					<Spinner animation="grow" variant="secondary" />
				</div>
			)}
		</Fragment>
	);
};

export default ContactList;
