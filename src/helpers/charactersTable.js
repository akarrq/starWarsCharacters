export function labelDisplayedRows({ from, to, count }) {
	return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

export function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
export function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export const headCells = [
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

export const blankPlanet = {
	climate: 'error',
	created: 'error',
	diameter: 'error',
	edited: 'error',
	films: 'error',
	gravity: 'error',
	name: 'error',
	orbital_period: 'error',
	population: 'error',
	residents: 'error',
	rotation_period: 'error',
	surface_water: 'error',
	terrain: 'error',
	url: 'error',
};
