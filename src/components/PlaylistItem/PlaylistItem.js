import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';

function PlaylistItem({ name, playlistId, image }) {
	const history = useHistory();

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => history.push(`/playlist/${playlistId}`)}>
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src={image} variant="square" sx={{ height: 50, width: 40 }} />
				</ListItemAvatar>
				<ListItemText primary={name} sx={{ color: 'text.primary' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default PlaylistItem;
