import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { labelDisplayedRows } from '../../helpers/charactersTable';
import { TableFooterProps } from '../../types/interface';

export default function TableFooter(props: TableFooterProps) {
	const { data, page, rowsPerPage, handleChangePage, getLabelDisplayedRowsTo } =
		props;
	return (
		<tfoot>
			<tr>
				<td colSpan={6}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							justifyContent: 'flex-end',
						}}
					>
						<Typography textAlign="center" sx={{ minWidth: 80 }}>
							{labelDisplayedRows({
								from:
									data?.results.length === 0 ? 0 : (page - 1) * rowsPerPage + 1,
								to: getLabelDisplayedRowsTo(),
								count: data ? data?.count : 0,
							})}
						</Typography>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<IconButton
								size="sm"
								color="neutral"
								variant="outlined"
								disabled={data ? data.previous === null : false}
								onClick={() => handleChangePage(page - 1)}
								sx={{ bgcolor: 'background.surface' }}
							>
								<KeyboardArrowLeftIcon />
							</IconButton>
							<IconButton
								size="sm"
								color="neutral"
								variant="outlined"
								disabled={data ? data.next === null : false}
								onClick={() => handleChangePage(page + 1)}
								sx={{ bgcolor: 'background.surface' }}
							>
								<KeyboardArrowRightIcon />
							</IconButton>
						</Box>
					</Box>
				</td>
			</tr>
		</tfoot>
	);
}
