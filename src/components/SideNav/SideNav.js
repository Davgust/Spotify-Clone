import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SideNavOption from '../SideNavOption/SideNavOption';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function SideNav({ items, loading }) {
	const history = useHistory();

	const renderPlaylists = () => {
		if (loading) return 'Loading';
		return items.map((playlist, i) => <SideNavOption {...playlist} key={i} />);
	};

	return (
		<Box
			className="SideNav"
			sx={{
				display: { xs: 'none', md: 'block' },
				backgroundColor: 'black',
				height: '100vh',
				width: '240px ',
				position: { xs: 'unset', md: 'fixed' },
				top: 0,
				left: 0
			}}
		>
			<img style={{ marginLeft: 24, marginTop: 10 }} src="/Spotify-Logo.png" alt={'Spotify'} width={130} />
			<Box sx={{ width: '100%', maxWidth: 360, color: 'text.primary' }}>
				<nav aria-label="main mailbox folders">
					<List>
						<ListItem disablePadding>
							<ListItemButton onClick={() => history.push('/')}>
								<ListItemIcon>
									<HomeIcon sx={{ color: 'text.primary' }} />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => history.push('/search')}>
								<ListItemIcon>
									<SearchIcon sx={{ color: 'text.primary' }} />
								</ListItemIcon>
								<ListItemText primary="Search" />
							</ListItemButton>
						</ListItem>
					</List>
				</nav>
				<Divider sx={{ bgcolor: 'text.secondary' }} variant="middle" />
				<List style={{ maxHeight: 600, overflow: 'auto', scrollbarWidth: 'none' }}>{renderPlaylists()}</List>
			</Box>
		</Box>
	);
}

const mapState = (state) => {
	const { items, loading } = state.playlist;
	return { items, loading };
};

export default connect(mapState)(SideNav);
