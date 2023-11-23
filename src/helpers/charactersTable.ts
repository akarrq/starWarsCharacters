import { HeadCell } from '../types/interface';
import { TableOrder } from '../types/type';

export function labelDisplayedRows({
	from,
	to,
	count,
}: {
	from: number;
	to: number;
	count: number;
}) {
	return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator<Key extends keyof any>(
	order: TableOrder,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
export function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export const headCells: readonly HeadCell[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Name',
	},
	{
		id: 'height',
		numeric: false,
		disablePadding: false,
		label: 'Height',
	},
	{
		id: 'mass',
		numeric: false,
		disablePadding: false,
		label: 'Mass',
	},
	{
		id: 'created',
		numeric: false,
		disablePadding: false,
		label: 'Created',
	},
	{
		id: 'edited',
		numeric: false,
		disablePadding: false,
		label: 'Edited',
	},
	{
		id: 'homeworld',
		numeric: false,
		disablePadding: false,
		label: 'Planet',
	},
];
