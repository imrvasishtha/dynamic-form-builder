/* eslint-disable import/no-cycle */
import axios from 'axios';
import getConfig from 'next/config';
import { toast } from 'react-toastify';

const { publicRuntimeConfig } = getConfig();

// constants
export const SET_FORM_LINKS = 'SET_FORM_LINKS';
export const SET_FORM_LISTING = 'SET_FORM_LISTING';

/**
 * @type {boolean}
 */
// set form links
export function setFormLinks(data = []) {
  return {
    type: SET_FORM_LINKS,
    payload: data,
  };
}

/**
 * @type {boolean}
 */
// set form data
export function setformListing(data = []) {
  return {
    type: SET_FORM_LISTING,
    payload: data,
  };
}

/**
 * @type {object} status
 */
// save form data in database by API
export const saveNewForm = (data) => (dispatch, getState) => {
  const url = `${publicRuntimeConfig.ApiBaseUrl}/form`;
  const { formLinks } = getState().dynamicForm;
  return axios({
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    data,
    responseType: 'json',
  })
    .then((response) => {
      dispatch(setFormLinks([...formLinks, response.data.data._id]));
      toast('form saved successfully');
    })
    .catch((error) => error.response && error.response.data);
};

/**
 * @type {object} status
 */
// fetch form data from database by API
export const fetchForms = () => (dispatch) => {
  const url = `${publicRuntimeConfig.ApiBaseUrl}/form`;
  const params = { $limit: 100 };
  return axios({
    url,
    params,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    responseType: 'json',
  })
    .then((response) => {
      dispatch(setformListing(response.data.data.docs));
    })
    .catch((error) => error.response && error.response.data);
};

// initial State
export const initialState = {
  formLinks: [],
};

// swicthing actions
const ACTION_HANDLERS = {
  [SET_FORM_LINKS]: (state, action) => ({
    ...state,
    formLinks: action.payload,
  }),
  [SET_FORM_LISTING]: (state, action) => ({
    ...state,
    formListing: action.payload,
  }),
};

// dynamic form reducer
/**
 * @type {object} state
 * @type {string} action
 */
export default function dynamicFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
