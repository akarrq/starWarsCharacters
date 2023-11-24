import { TableOrder } from './type';
import { MouseEvent } from 'react';

export interface Data {
	count: number;
	next: string | null;
	previous: string | null;
	results: Character[];
}

export interface Character {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string;
	species: string;
	vehicles: string;
	starships: string;
	created: string;
	edited: string;
	url: string;
}

export interface Planet {
	climate: string;
	created: string;
	diameter: string;
	edited: string;
	films: string;
	gravity: string;
	name: string;
	orbital_period: string;
	population: string;
	residents: string;
	rotation_period: string;
	surface_water: string;
	terrain: string;
	url: string;
}

export interface HeadCell {
	disablePadding: boolean;
	id: keyof Character;
	label: string;
	numeric: boolean;
}

export interface TableHeadProps {
	onRequestSort: (
		event: MouseEvent<unknown>,
		property: keyof Character
	) => void;
	order: TableOrder;
	orderBy: string;
}

export interface TableToolbarProps {
	handleSearchCharacters: (term: string) => void;
}

export interface TableFooterProps {
	data: Data | null;
	page: number;
	rowsPerPage: number;
	handleChangePage: (newPage: number) => void;
	getLabelDisplayedRowsTo: () => number;
}
