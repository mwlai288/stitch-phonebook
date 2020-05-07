import React, { useContext, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ContactContext from '../context/contacts/contactContext';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const {
		deleteContact,
		clearCurrent,
		setCurrent,
		handleFileUpload,
	} = contactContext;

	const fileInput = useRef();

	const { _id, image } = contact;
	const { name, email, phone } = contact.contact;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	const formatPhoneNumber = (phoneNumberString) => {
		var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return null;
	};

	const fileSubmit = (e) => {
		e.preventDefault();
		const file = fileInput.current.files[0];
		handleFileUpload(file, _id);
	};

	return (
		<Card>
			<Card.Body>
				<h3>Name: {name}</h3>
				<Card.Text>Email: {email}</Card.Text>
				<Card.Text>Phone: {formatPhoneNumber(phone)}</Card.Text>
				<ButtonStyles>
					<Button variant="secondary" onClick={() => setCurrent(contact)}>
						Edit
					</Button>
					<Button variant="danger" onClick={onDelete}>
						Delete
					</Button>
				</ButtonStyles>
				{image ? (
					<Card.Img src={image} />
				) : (
					<Form onSubmit={fileSubmit}>
						<Form.Group>
							<Form.Label>
								Upload picture
								<Form.Control type="file" ref={fileInput} />
							</Form.Label>
						</Form.Group>
						<Button type="submit" variant="secondary" size="sm">
							Add Photo
						</Button>
					</Form>
				)}
			</Card.Body>
		</Card>
	);
};

export default ContactItem;

const ButtonStyles = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	button:first-child {
		margin-right: 5px;
	}
`;
