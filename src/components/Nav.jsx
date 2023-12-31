import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function Nav() {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexGrow: 1,
				p: 5,
				minWidth: 'min-content',
			}}
		>
			<Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
				<Typography level="h2" sx={{ color: '#F0F4F8' }}>
					Star Wars Characters
				</Typography>
			</Box>
		</Box>
	);
}
