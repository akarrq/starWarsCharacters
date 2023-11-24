import { useRef, ChangeEvent } from 'react';

import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import { TableToolbarProps } from '../../types/interface';

export default function TableToolbar(props: TableToolbarProps) {
	const { handleSearchCharacters } = props;
	const timerRef = useRef<number>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = window.setTimeout(() => {
			handleSearchCharacters(event.target.value);
		}, 1000);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				py: 1,
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				borderTopLeftRadius: 'var(--unstable_actionRadius)',
				borderTopRightRadius: 'var(--unstable_actionRadius)',
			}}
		>
			<Typography
				level="body-lg"
				sx={{ flex: '1 1 100%' }}
				id="tableTitle"
				component="div"
			>
				Characters List
			</Typography>
			<Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
				<Input
					onChange={handleChange}
					placeholder="Search character"
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
