import * as actionTypes from './actionTypes';

export const addDeviceId = (device_id) => ({ type: actionTypes.ADD_DEVICE_ID, payload: device_id });
export const play = () => ({ type: actionTypes.PLAY });
export const pause = () => ({ type: actionTypes.PAUSE });

export const updatePlayerStart = () => {
	return {
		type: actionTypes.UPDATE_PLAYER_START
	};
};

export const updatePlayerFail = (error) => {
	return {
		type: actionTypes.UPDATE_PLAYER_FAIL,
		payload: error
	};
};

export const updatePlayerSuccess = (payload) => {
	return {
		type: actionTypes.UPDATE_PLAYER_SUCCESS,
		payload
	};
};

export const updateSongInfo = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(updatePlayerStart());
		try {
			const currentSong = await spotifyApi.getMyCurrentPlayingTrack();
			const item = currentSong.body.item;
			const duration = item.duration_ms / 1000;
			const progress = currentSong.body.progress_ms / 1000;
			const data = {
				title: item.name,
				image: item.album.images[1],
				artist: item.artists[0].name,
				duration,
				progress
			};
			dispatch(updatePlayerSuccess(data));
		} catch (error) {
			dispatch(updatePlayerFail(error));
		}
	};
};

export const updateSongInfoStart = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(updatePlayerStart());
		try {
			const song = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
			const item = song.body.items[0].track;
			const duration = item.duration_ms / 1000;
			const data = {
				title: item.name,
				image: item.album.images[1],
				artist: item.artists[0].name,
				duration,
				progress: 0
			};
			dispatch(updatePlayerSuccess(data));
		} catch (error) {
			dispatch(updatePlayerFail(error));
		}
	};
};
