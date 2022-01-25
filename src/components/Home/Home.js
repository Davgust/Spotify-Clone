import { Box, Grid, Typography, Button } from '@mui/material';

const style = {
	position: 'fixed',
	top: 0,
	left: 0,
	height: '100vh',
	width: '100%'
};

const Home = ({}) => {
	return (
		<Box sx={style} className="gradient-animation">
			<Grid
				container
				spacing={0}
				direction="row"
				alignItems="center"
				justifyContent="center"
				sx={{ height: 'calc(100% - 105px)' }}
			>
				<Grid item xs={12} lg={12} sx={{ textAlign: 'center' }}>
					<Typography color="text.primary" variant={'h1'} gutterBottom>
						Davids Spotify Clone
					</Typography>
					<Typography color="text.primary" variant={'h1'} mb={6}>
						Created with:
					</Typography>
					<Typography color="text.primary" variant={'h1'}>
						React | Redux | JavaScript | CSS | MUI
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
