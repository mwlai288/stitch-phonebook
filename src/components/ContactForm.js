import React, { useState, Fragment, useContext, useEffect } from 'react';
import ContactContext from '../context/contacts/contactContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, clearCurrent, current } = contactContext;

	const [contact, setContact] = useState({
		name: '',
		phone: '',
		email: '',
	});

	const { name, email, phone } = contact;

	useEffect(() => {
		if (current !== null) {
			setContact({
				name: current.contact.name,
				email: current.contact.email,
				phone: current.contact.phone,
			});
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
			});
		}
	}, [contactContext, current]);

	const onChange = (e) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const handleAddContact = (e) => {
		e.preventDefault();
		if (current === null) {
			if (contact) {
				if (contact.phone.length === 10) {
					addContact(contact);
					setContact({
						name: '',
						email: '',
						phone: '',
					});
				} else {
					alert('Enter 10 digit phone number');
				}
			}
		} else {
			updateContact(current._id, contact);
			clearCurrent();
		}
	};

	return (
		<Fragment>
			{current ? 'Edit Contact' : 'Add Contact'}
			<Form onSubmit={handleAddContact}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Name"
						name="name"
						onChange={onChange}
						value={name}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						name="email"
						onChange={onChange}
						value={email}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Phone number</Form.Label>
					<Form.Control
						type="text"
						placeholder="Phone number"
						name="phone"
						onChange={onChange}
						value={phone}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					{current ? 'Update' : 'Add Contact'}
				</Button>
			</Form>
		</Fragment>
	);
};

export default ContactForm;
