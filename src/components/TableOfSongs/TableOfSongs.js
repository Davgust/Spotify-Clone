import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SongRow from '../SongRow/SongRow';

const TableOfSongs = ({ loading, spotifyApi, songs }) => {
	const renderSongRows = () => {
		if (loading) return [1, 2, 3, 4, 5, 6].map((e, i) => <SongRow loading={true} key={i} index={i} />);
		return songs.map((song, i) => (
			<SongRow
				spotifyApi={spotifyApi}
				{...song}
				position={song.track.position}
				contextUri={song.track.contextUri}
				key={i}
				index={i}
			/>
		));
	};

	return (
		<TableContainer>
			<Table size="small" padding="none">
				<TableHead>
					<TableRow>
						<TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>#</TableCell>
						<TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Title</TableCell>
						<TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }} align="right">
							Album
						</TableCell>
						<TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }} align="right">
							Duration
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{renderSongRows()}</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableOfSongs;
