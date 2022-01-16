import { Box, Button } from '@mui/material';
import { accessUrl } from '../../login-to-spotify';

const Login = (params) => {
	return (
		<Box
			sx={{
				bgcolor: 'black',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			<img
				src="/Spotify-Logo.png"
				alt="Spotify"
				width={250}
				style={{ marginBottom: '150px', width: '70%', maxWidth: 500 }}
			/>
			<Button
				href={accessUrl}
				color="primary"
				variant="contained"
				size="large"
				sx={{ borderRadius: '30px', fontSize: '20px' }}
			>
				Log in to Spotify
			</Button>
		</Box>
	);
};

export default Login;
