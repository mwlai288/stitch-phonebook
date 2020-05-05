import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ContactContext from '../context/contacts/contactContext';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, clearCurrent, setCurrent } = contactContext;

	const { _id } = contact;
	const { name, email, phone } = contact.contact;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	return (
		<div>
			<h3>{name}</h3>
			<ul>
				{email}
				{phone}
			</ul>
			<div>
				<Button onClick={() => setCurrent(contact)}>Edit</Button>
				<Button onClick={onDelete}>Delete</Button>
			</div>
		</div>
	);
};

export default ContactItem;
