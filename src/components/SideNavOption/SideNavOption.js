import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';

function SideNavOption({ name, id }) {
	const history = useHistory();

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => history.push(`/playlist/${id}`)}>
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
}

export default SideNavOption;
