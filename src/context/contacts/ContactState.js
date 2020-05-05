import React, { useReducer } from 'react';
import { useStitchAuth } from '../auth/StitchAuth';
import { items } from '../../stitch/mongodb';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);
	const { currentUser } = useStitchAuth();
	// Get Contacts
	const loadContacts = async () => {
		const contacts = await items.find({}, { limit: 100 }).asArray();
		dispatch({ type: 'setContacts', payload: contacts });
	};

	// Add Contact
	const addContact = async (contact) => {
		const person = { contact, owner_id: currentUser.id };
		const result = await items.insertOne(person);
		dispatch({
			type: 'addContact',
			payload: { ...person, _id: result.insertedId },
		});
	};

	// Delete Contact
	const deleteContact = async (id) => {
		await items.deleteOne({ _id: id });
		dispatch({ type: 'deleteContact', payload: id });
	};

	// Update Contact
	const updateContact = async (contactId, contact) => {
		const query = { _id: contactId };
		const update = {
			$set: {
				contact,
			},
		};
		const options = { upsert: false };
		await items.updateOne(query, update, options);
		dispatch({
			type: 'updateContact',
			payload: { contact, contactId },
		});
	};

	// Set Current Contact

	const setCurrent = (contact) => {
		dispatch({ type: 'setCurrent', payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: 'clearCurrent' });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				loadContacts,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
