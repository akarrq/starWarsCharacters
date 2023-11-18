import * as React from 'react';
import Box from '@mui/joy/Box';
import { ColorPaletteProp } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
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
			<Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
				<Input
					placeholder="Search"
					variant="soft"
					size="md"
					sx={{
						'--Input-paddingInline': '12px',
						display: { xs: 'none', lg: 'flex' },
					}}
				/>
			</Box>
		</Box>
	);
}
