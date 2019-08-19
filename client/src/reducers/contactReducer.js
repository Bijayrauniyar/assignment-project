import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT
} from '../actions/types';

const initialState = {
  contacts: [],
  contact: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact.id !== action.payload;
        })
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => {
          return contact.id === action.payload.id
            ? (contact = action.payload)
            : contact;
        })
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload
      };

    default:
      return state;
  }
}
