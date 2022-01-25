import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function SideNavOption({ name, id }) {
	const [isActive, setIsActive] = useState(false);

	return (
		<ListItem disablePadding>
			<ListItemButton
				component={NavLink}
				to={`/playlist/${id}`}
				isActive={(match) => {
					setIsActive(!!match);
				}}
			>
				<ListItemText primary={name} sx={{ color: isActive ? 'primary.main' : 'text.primary' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default SideNavOption;
