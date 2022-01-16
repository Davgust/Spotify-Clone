import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as actions from './actions/index';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import playlistReducer from './reducers/playlistReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ auth: authReducer, playlist: playlistReducer });

const configureStore = () => {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

	// App auth
	store.dispatch(actions.fetchToken());

	return store;
};

export default configureStore;
