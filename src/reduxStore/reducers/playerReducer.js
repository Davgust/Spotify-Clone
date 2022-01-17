import * as actionTypes from '../actions/actionTypes';

const initState = {
	loading: false,
	error: null,
	playing: false,
	device_id: null
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.ADD_DEVICE_ID:
			return { ...state, device_id: action.payload };

		case actionTypes.PLAY:
			return { ...state, playing: true };

		case actionTypes.PAUSE:
			return { ...state, playing: false };

		default:
			return state;
	}
};

export default reducer;
