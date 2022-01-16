import * as actionTypes from '../actions/actionTypes';

const initialState = {
	loading: false,
	error: null,
	token: null,
	user: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				token: action.payload
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};

		//USER
		case actionTypes.FETCH_CURRENT_USER_START:
			return {
				...state,
				loading: true,
				error: null
			};
		case actionTypes.FETCH_CURRENT_USER_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				user: action.payload
			};
		case actionTypes.FETCH_CURRENT_USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};

		default:
			return state;
	}
};

export default reducer;
