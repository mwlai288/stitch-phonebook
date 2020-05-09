import React, { useContext, useRef, Fragment, useState } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ContactContext from '../context/contacts/contactContext';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const {
		deleteContact,
		clearCurrent,
		setCurrent,
		handleFileUpload,
		loadContacts,
		deleteImage,
	} = contactContext;

	const fileInput = useRef();

	const { _id } = contact;
	const { name, email, phone, image } = contact.contact;

	const [error, setError] = useState(false);

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

	const fileSubmit = async (e) => {
		e.preventDefault();
		const file = fileInput.current.files[0];
		if (file === undefined) {
			setError(true);
		} else {
			handleFileUpload(file, _id);
		}
		setTimeout(() => {
			loadContacts();
		}, 5600);
	};

	const deletePicture = () => {
		deleteImage(_id);
		setTimeout(() => {
			loadContacts();
		}, 1400);
	};

	return (
		<Fragment>
			<Card style={{ width: '18rem' }}>
				{image ? (
					<ImageContainer>
						<DeleteButton onClick={deletePicture}>X</DeleteButton>
						<Card.Img variant="top" src={image} />
					</ImageContainer>
				) : (
					<Form onSubmit={fileSubmit}>
						<Form.Group>
							<Form.Label>
								Upload picture
								<Form.Control type="file" ref={fileInput} />
							</Form.Label>
						</Form.Group>
						<Alert show={error} variant="danger">
							<Alert.Heading>Please select a file</Alert.Heading>
							<div className="d-flex justify-content-end">
								<Button
									onClick={() => setError(false)}
									variant="outline-danger"
								>
									X
								</Button>
							</div>
						</Alert>
						<Button type="submit" variant="secondary" size="sm">
							Add Photo
						</Button>
					</Form>
				)}
				<DeleteButton onClick={deletePicture}>X</DeleteButton>

				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>
						<FiMail />:{' '}
						{email ? email : <EmptyField>No email provided</EmptyField>}
					</Card.Text>
					<Card.Text>
						<FiPhone />:{' '}
						{phone ? (
							formatPhoneNumber(phone)
						) : (
							<EmptyField>No phone number provided</EmptyField>
						)}
					</Card.Text>
					<ButtonStyles>
						<Button variant="secondary" onClick={() => setCurrent(contact)}>
							Edit
						</Button>
						<Button variant="danger" onClick={onDelete}>
							Delete
						</Button>
					</ButtonStyles>
				</Card.Body>
			</Card>
		</Fragment>
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
const DeleteButton = styled.span`
	cursor: pointer;
	position: absolute;
	color: white;
	font-weight: 500;
	display: none;
`;

const ImageContainer = styled.div`
	position: relative;
	&:hover ${DeleteButton} {
		top: 0;
		right: 0;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.6);
		display: block;
	}
`;

const EmptyField = styled.span`
	font-style: italic;
`;
