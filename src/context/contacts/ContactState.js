import React, { useReducer } from 'react';
import { useStitchAuth } from '../auth/StitchAuth';
import { items, aws } from '../../stitch/mongodb';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { AwsRequest } from 'mongodb-stitch-browser-services-aws';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		image: null,
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

	// Upload File
	const convertImageToBSONBinaryObject = (file) => {
		return new Promise((resolve) => {
			var fileReader = new FileReader();
			fileReader.onload = (event) => {
				resolve({
					$binary: {
						base64: event.target.result.split(',')[1],
						subType: '00',
					},
				});
			};
			fileReader.readAsDataURL(file);
		});
	};

	const handleFileUpload = async (file, _id) => {
		// Process the image file
		const fileBinary = await convertImageToBSONBinaryObject(file);
		// Upload the image binary to S3
		const key = `${currentUser.id}-${file.name}`;
		const bucket = 'stitchphonebook';
		const url = `http://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;
		const args = {
			ACL: 'public-read',
			Bucket: bucket,
			ContentType: file.type,
			Key: key,
			Body: fileBinary,
		};
		const request = new AwsRequest.Builder()
			.withService('s3')
			.withAction('PutObject')
			.withRegion('us-east-2')
			.withArgs(args);

		try {
			await aws.execute(request.build());

			const query = { _id };
			const update = { $set: { image: url } };
			await items.updateOne(query, update);
			dispatch({
				type: 'updateContact',
				payload: url,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				image: state.image,
				loadContacts,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				handleFileUpload,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;

// convertImageToBSONBinaryObject(file).then((result) => {
// 	const key = `${currentUser.id}-${file.name}`;
// 	const bucket = 'stitchphonebook';
// 	const url = `http://${bucket}.s3.amazonaws.com/${encodeURIComponent(
// 		key
// 	)}`;

// 	const args = {
// 		ACL: 'public-read',
// 		Bucket: bucket,
// 		ContentType: file.type,
// 		Key: key,
// 		Body: result,
// 	};
// 	const request = new AwsRequest.Builder()
// 		.withService('s3')
// 		.withAction('PutObject')
// 		.withRegion('us-east-2')
// 		.withArgs(args);
// 	aws.execute(request.build()).then((result) => {
// 		console.log(result);
// 		console.log(url);

// 		return items.insertOne(url);
// 	});
// });
