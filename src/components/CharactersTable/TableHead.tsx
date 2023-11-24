import { MouseEvent } from 'react';

import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';

import { headCells } from '../../helpers/charactersTable';
import { Character, TableHeadProps } from '../../types/interface';

export default function TableHead(props: TableHeadProps) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler =
		(property: keyof Character) => (event: MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<thead>
			<tr>
				{headCells.map((headCell) => {
					const active = orderBy === headCell.id;
					return (
						<th key={headCell.id}>
							<Link
								underline="none"
								color="neutral"
								textColor={active ? 'primary.plainColor' : undefined}
								component="button"
								onClick={createSortHandler(headCell.id)}
								fontWeight="lg"
								startDecorator={
									headCell.numeric ? (
										<ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
									) : null
								}
								endDecorator={
									!headCell.numeric ? (
										<ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
									) : null
								}
								sx={{
									'& svg': {
										transition: '0.2s',
										transform:
											active && order === 'desc'
												? 'rotate(0deg)'
												: 'rotate(180deg)',
									},
									'&:hover': { '& svg': { opacity: 1 } },
								}}
							>
								{headCell.label}
								{active ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</Link>
						</th>
					);
				})}
			</tr>
		</thead>
	);
}
