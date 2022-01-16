import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PlaylistItem from '../PlaylistItem/PlaylistItem';

const mockPlaylist = [
	{ name: 'Rock', playlistId: 123, image: '/Floyd-logo.jpg' },
	{ name: 'Pop', playlistId: 646, image: '/Floyd-logo.jpg' },
	{ name: 'Hip hop', playlistId: 834, image: '/Floyd-logo.jpg' },
	{ name: 'X-mas', playlistId: 5503, image: '/Floyd-logo.jpg' },
	{ name: 'Code life', playlistId: 4832, image: '/Floyd-logo.jpg' }
];

function Library({ playlists = mockPlaylist }) {
	const renderPlaylistItems = () => {
		if (!playlists) return 'Loading';
		return playlists.map((playlist, i) => <PlaylistItem {...playlist} key={i} />);
	};

	return (
		<Box
			sx={{
				display: { xs: 'block', md: 'none' },
				backgroundColor: 'background.paper',
				minHeight: '100vh',
				padding: '30px 16px'
			}}
		>
			<Typography variant="h1" sx={{ color: 'text.primary' }}>
				Ditt bibliotek
			</Typography>
			<List>{renderPlaylistItems()}</List>
		</Box>
	);
}

export default Library;
