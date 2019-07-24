import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  info: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        info: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };

    case CLEAR_ERRORS:
      return {
        info: {},
        status: null,
        id: null
      };
    
    default:
      return state;
  }
}