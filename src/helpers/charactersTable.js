export function labelDisplayedRows({ from, to, count }) {
	return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

export function descendingComparator(a, b, orderBy) {
	const valueA =
		orderBy === 'height' || orderBy === 'mass'
			? parseFloat(a[orderBy])
			: a[orderBy];
	const valueB =
		orderBy === 'height' || orderBy === 'mass'
			? parseFloat(b[orderBy])
			: b[orderBy];

	if (valueB < valueA) {
		return -1;
	}
	if (valueB > valueA) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function sortElements(array, comparator) {
	return [...array].sort((a, b) => comparator(a, b));
}

export const headCells = [
	{
		id: 'name',
		numeric: false,
		label: 'Name',
	},
	{
		id: 'height',
		numeric: true,
		label: 'Height',
	},
	{
		id: 'mass',
		numeric: true,
		label: 'Mass',
	},
	{
		id: 'created',
		numeric: false,
		label: 'Created',
	},
	{
		id: 'edited',
		numeric: false,
		label: 'Edited',
	},
	{
		id: 'homeworld',
		numeric: false,
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
