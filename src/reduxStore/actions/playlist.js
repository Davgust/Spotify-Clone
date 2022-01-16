import * as actionTypes from './actionTypes';

const fetchPlaylistStart = () => {
	return { type: actionTypes.FETCH_PLAYLIST_START };
};

const fetchPlaylistFail = (error) => {
	return { type: actionTypes.FETCH_PLAYLIST_FAIL, payload: error };
};

const fetchPlaylistSuccess = (data) => {
	return { type: actionTypes.FETCH_PLAYLIST_SUCCESS, payload: data };
};

export const fetchPlaylist = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(fetchPlaylistStart());
		try {
			const playlists = await spotifyApi.getUserPlaylists();
			dispatch(fetchPlaylistSuccess(playlists.body.items));
		} catch (error) {
			dispatch(fetchPlaylistFail(error));
		}
	};
};
