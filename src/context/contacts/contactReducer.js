export default (state, action) => {
	switch (action.type) {
		case 'setContacts':
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		case 'loadPicture': {
			return {
				...state,
				loading: false,
			};
		}
		case 'addContact':
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				loading: false,
			};
		case 'updateContact':
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload.contactId
						? {
								...contact,
								contact: action.payload.contact,
						  }
						: contact
				),
			};
		case 'deleteContact':
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
				loading: false,
			};
		case 'setCurrent':
			return {
				...state,
				current: action.payload,
			};
		case 'clearCurrent':
			return {
				...state,
				current: null,
			};
		default:
			return state;
	}
};
