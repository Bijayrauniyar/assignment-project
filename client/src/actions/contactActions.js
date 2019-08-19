import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT
} from './types';
import axios from 'axios';
const baseUrl = 'http://localhost:8000/contacts';
export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}`, {
      withCredentials: true
    });
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  
  } catch (e) {
   return e.response
  }
};

export const deleteContact = (id) => async (dispatch) => {
  await axios.delete(`${baseUrl}/${id}`, {
    withCredentials: true
  });
  dispatch({ type: DELETE_CONTACT, payload: id });
};

export const addContact = (contact) => async (dispatch) => {
  const res = await axios.post(`${baseUrl}`, contact, {
    withCredentials: true
  });
  dispatch({ type: ADD_CONTACT, payload: res.data });
};
export const getContact = (id) => async (dispatch) => {
  const res = await axios.get(`${baseUrl}/${id}`, { withCredentials: true });
  dispatch({ type: GET_CONTACT, payload: res.data });
};
export const updateContact = (id, contact) => async (dispatch) => {
  const res = await axios.put(`${baseUrl}/${id}`, contact, {
    withCredentials: true
  });
  console.log("46",res);
  dispatch({ type: UPDATE_CONTACT, payload: res.data });
};
