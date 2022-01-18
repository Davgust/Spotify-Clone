import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Avatar, Stack, Slider, IconButton } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import { connect } from 'react-redux';
import { play, pause, updateSongInfo, updateSongInfoStart } from '../../reduxStore/actions/index';

const Player = ({
	spotifyApi,
	deviceId,
	pause,
	play,
	playing,
	updateSongInfo,
	updateSongInfoStart,
	title,
	image,
	artist,
	duration,
	progress,
	loading
}) => {
	const [volume, setVolume] = useState(30);

	useEffect(() => {
		updateSongInfoStart(spotifyApi);
	}, [spotifyApi]);

	const formatTime = (value) => {
		const rest = (value % 60).toFixed(0);
		const min = Math.floor(value / 60);
		const seconds = rest < 10 ? `0${rest}` : rest;
		return `${min}:${seconds}`;
	};

	useEffect(() => {
		let interval = null;
		if (playing) {
			interval = setInterval(() => {
				console.log('Progress the song');
			}, 1000);
		} else if (!playing && progress !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [playing, progress]);

	const togglePlay = async () => {
		if (loading) return;

		if (!playing) {
			play();
			try {
				await spotifyApi.transferMyPlayback([deviceId]);
				await spotifyApi.play();
				updateSongInfo(spotifyApi);
			} catch (e) {
				console.error(e);
			}
		} else {
			pause();
			const tryToPause = await spotifyApi.pause();
		}
	};

	const handleVolumeChange = (event, newValue) => {
		if (loading) setVolume(newValue);
	};

	const handleOnSkipPrev = async () => {
		if (loading) return;
		play();
		await spotifyApi.skipToPrevious();
		updateSongInfo(spotifyApi);
	};

	const handleOnSkipNext = async () => {
		if (loading) return;
		play();
		await spotifyApi.skipToNext();
		updateSongInfo(spotifyApi);
	};

	const sliderStyle = {
		color: '#fff',
		alignItems: 'center',
		height: 4,
		width: { xs: 100, md: 250 },
		'& .MuiSlider-thumb': {
			width: 8,
			height: 8,
			transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
			'&:before': {
				boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)'
			},
			'&:hover, &.Mui-focusVisible': {
				boxShadow: `0px 0px 0px 8px 'rgb(0 0 0 / 16%)`
			},
			'&.Mui-active': {
				width: 20,
				height: 20
			}
		},
		'& .MuiSlider-rail': {
			opacity: 0.28
		}
	};

	return (
		<Box
			p={1}
			sx={{
				bgcolor: 'background.paper',
				height: 90,
				width: '100%',
				position: 'fixed',
				bottom: { xs: 56, md: 0 },
				left: 0,
				right: 0,
				boxSizing: 'border-box'
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={4} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<Stack direction="row" spacing={4}>
						<Avatar
							alt={title}
							src={image ? image.url : ''}
							variant="square"
							sx={{ width: '56px', height: '56px', display: { xs: 'none', md: 'block' } }}
						/>
						<Box>
							<Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
								{title}
							</Typography>
							<Typography variant="caption" sx={{ color: 'text.secondary' }}>
								{artist}
							</Typography>
						</Box>
					</Stack>
				</Grid>
				<Grid item xs={8} md={6}>
					<Stack spacing={0} direction="column" alignItems="center">
						<Stack spacing={2} direction="row" alignItems="center">
							<IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleOnSkipPrev}>
								<SkipPreviousIcon />
							</IconButton>
							<IconButton size="small" sx={{ color: 'text.secondary' }} onClick={togglePlay}>
								{playing ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
							</IconButton>
							<IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleOnSkipNext}>
								<SkipNextIcon />
							</IconButton>
						</Stack>
						<Stack spacing={2} direction="row" display="flex" alignItems="center">
							<Typography variant="body1" sx={{ color: 'text.secondary' }}>
								{formatTime(progress)}
							</Typography>
							<Slider
								sx={sliderStyle}
								size="medium"
								value={progress}
								aria-label="Default"
								valueLabelDisplay="auto"
								onChange={() => {
									console.log('Move through the song');
								}}
							/>
							<Typography variant="body1" sx={{ color: 'text.secondary' }}>
								{formatTime(duration)}
							</Typography>
						</Stack>
					</Stack>
				</Grid>
				<Grid
					item
					xs={0}
					md={3}
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'end', alignItems: 'center' }}
				>
					<Box sx={{ width: 200 }}>
						<Stack spacing={2} direction="row" alignItems="center">
							<VolumeDown sx={{ color: 'text.primary' }} />
							<Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} />
							<VolumeUp sx={{ color: 'text.primary' }} />
						</Stack>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

const mapState = (state) => {
	const { title, image, artist, duration, progress, device_id, playing, loading } = state.player;
	return {
		deviceId: device_id,
		playing,
		title,
		image,
		artist,
		duration,
		progress,
		loading
	};
};

const mapDispatch = (dispatch) => {
	return {
		play: () => dispatch(play()),
		pause: () => dispatch(pause()),
		updateSongInfo: (api) => dispatch(updateSongInfo(api)),
		updateSongInfoStart: (api) => dispatch(updateSongInfoStart(api))
	};
};

export default connect(mapState, mapDispatch)(Player);
