import React, { useState, Fragment, useContext, useEffect } from 'react';
import ContactContext from '../context/contacts/contactContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import { AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, clearCurrent, current } = contactContext;

	const [contact, setContact] = useState({
		name: '',
		phone: '',
		email: '',
	});

	const [fieldErrors, setFieldErrors] = useState(false);
	const [phoneError, setPhoneError] = useState(false);

	const { name, email, phone } = contact;

	useEffect(() => {
		if (current !== null) {
			setContact({
				name: current.contact.name,
				email: current.contact.email,
				phone: current.contact.phone,
				image: current.contact.image,
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
			if (name === '' && email === '' && phone === '') {
				setFieldErrors(true);
			} else if (contact.phone.length !== 10) {
				setPhoneError(true);
			} else {
				addContact(contact);
				setContact({
					name: '',
					email: '',
					phone: '',
				});
			}
		} else {
			updateContact(current._id, contact);
			clearCurrent();
		}
	};

	return (
		<Fragment>
			<Heading>{current ? 'Edit Contact' : 'Add Contact'}</Heading>
			<Alert show={fieldErrors} variant="danger">
				<Alert.Heading>
					<AiOutlineInfoCircle />
					One or more fields are empty
					<div className="d-flex justify-content-end">
						<Button
							onClick={() => setFieldErrors(false)}
							variant="outline-danger"
						>
							<AiOutlineClose />
						</Button>
					</div>
				</Alert.Heading>
			</Alert>
			<Alert show={phoneError} variant="danger">
				<Alert.Heading>
					<AiOutlineInfoCircle />
					Please enter a 10 digit phone number.
					<div className="d-flex justify-content-end">
						<Button
							onClick={() => setPhoneError(false)}
							variant="outline-danger"
						>
							<AiOutlineClose />
						</Button>
					</div>
				</Alert.Heading>
			</Alert>

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

const Heading = styled.div`
	display: flex;
	justify-content: center;
	font-size: 3rem;
`;

// if (current === null) {
// 	if (contact) {
// 		if (contact.phone.length === 10) {
// 			addContact(contact);
// 			setContact({
// 				name: '',
// 				email: '',
// 				phone: '',
// 			});
// 		} else {
// 			alert('Enter 10 digit phone number');
// 		}
// 	}
// } else {
// 	updateContact(current._id, contact);
// 	clearCurrent();
// }
