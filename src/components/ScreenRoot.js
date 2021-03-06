import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import { ROUTES } from '../routes/routes';
import SideNav from './SideNav/SideNav';
import MobileNav from './MobileNav/MobileNav';
import Player from './Player/Player';
import Login from './Login/Login';
import { connect } from 'react-redux';
import { fetchUser, fetchPlaylist, addDeviceId } from '../reduxStore/actions/index';

const spotifyApi = new SpotifyWebApi();

const setupSpotifyConnect = (token, addDeviceId) => {
	const player = new window.Spotify.Player({
		name: 'Web Playback SDK Quick Start Player',
		getOAuthToken: (cb) => {
			cb(token);
		},
		volume: 0.5
	});

	// Ready
	player.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);
		addDeviceId(device_id);

		spotifyApi.transferMyPlayback([device_id]);
	});

	// Not Ready
	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	player.addListener('initialization_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('authentication_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('account_error', ({ message }) => {
		console.error(message);
	});

	player.connect();
};

const ScreenRoot = ({ token, fetchUser, fetchPlaylist, addDeviceId }) => {
	useEffect(() => {
		// Set up spotify:
		spotifyApi.setAccessToken(token);

		window.onSpotifyWebPlaybackSDKReady = () => {
			setupSpotifyConnect(token, addDeviceId);
		};

		const getData = async () => {
			fetchUser(spotifyApi);
			fetchPlaylist(spotifyApi);

			const devices = await spotifyApi.getMyDevices();
		};

		if (token) getData();
	}, [token, fetchUser, fetchPlaylist]);

	if (token) {
		return (
			<Router>
				<Box sx={{ paddingBottom: { xs: '146px', md: '90px' } }}>
					<Switch>
						{ROUTES.map((route, i) => (
							<Route
								key={i}
								path={route.path}
								exact={route.exact}
								render={(props) => <route.component spotifyApi={spotifyApi} {...props} />}
							/>
						))}
					</Switch>
					<SideNav />
				</Box>
				<Player spotifyApi={spotifyApi} />
				<MobileNav />
			</Router>
		);
	} else {
		return <Login />;
	}
};

const mapState = (state) => {
	return {
		token: state.auth.token
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchUser: (spotifyApi) => dispatch(fetchUser(spotifyApi)),
		fetchPlaylist: (spotifyApi) => dispatch(fetchPlaylist(spotifyApi)),
		addDeviceId: (id) => dispatch(addDeviceId(id))
	};
};

export default connect(mapState, mapDispatch)(ScreenRoot);
