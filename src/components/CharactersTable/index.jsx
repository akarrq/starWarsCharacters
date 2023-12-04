import React, { useState, useEffect, useMemo } from 'react';

import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Link from '@mui/joy/Link';
import Skeleton from '@mui/joy/Skeleton';

import TableHead from './TableHead';
import TableToolbar from './TableToolbar';
import TableFooter from './TableFooter';

import { formatDate } from '../../helpers/helpers';
import {
	blankPlanet,
	getComparator,
	stableSort,
} from '../../helpers/charactersTable';

export default function CharactersTable({ setPlanet }) {
	const [data, setData] = useState(null);
	const [planets, setPlanets] = useState(null);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [page, setPage] = useState(1);
	const rowsPerPage = 10;

	const fetchData = async (page) => {
		try {
			const response = await fetch(
				`https://swapi.dev/api/people/?search=${page}`
			);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error('Characters are not loaded. Something went wrong!');
		}
	};

	const fetchPlanetData = async (planetURL) => {
		try {
			const response = await fetch(planetURL);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Planets are not loaded. Something went wrong!');
			return blankPlanet;
		}
	};

	const getPlanets = async () => {
		if (data) {
			const planets = await Promise.all(
				data?.results.map(async (character) => {
					const planet = await fetchPlanetData(character.homeworld);
					return planet;
				})
			);
			setPlanets(planets);
		}
	};

	useEffect(() => {
		getPlanets();
	}, [data]);

	useEffect(() => {
		fetchData('&page=1');
	}, []);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (newPage) => {
		setPage(newPage);
		setData(null);
		setPlanets(null);
		fetchData(`&page=${newPage}`);
	};

	const handleSearchCharacters = (term) => {
		setData(null);
		setPlanets(null);
		fetchData(`${term}&page=${page}`);
	};

	const getLabelDisplayedRowsTo = () => {
		if (data) {
			if (data.results.length !== rowsPerPage) {
				return data?.count;
			}
			return data.results.length === 0 ? 0 : page * rowsPerPage;
		}
		return 0;
	};

	const getPlanet = (planets, planetURL) => {
		const planet = planets?.find((planet) => planet.url === planetURL);
		if (planet) {
			return planet;
		} else return null;
	};

	const generateSkeletonRow = useMemo(() => {
		const skeletonCells = Array.from({ length: 6 }, (_, index) => (
			<td key={index}>
				<Skeleton variant="text" level="body-xs" />
			</td>
		));
		return <tr>{skeletonCells}</tr>;
	}, []);

	return (
		<Sheet
			variant="outlined"
			sx={{
				width: ['99%', '90%'],
				maxWidth: '1800px',
				maxHeight: '80vh',
				overflow: 'auto',
				margin: '0 auto',
				boxShadow: 'sm',
				borderRadius: 'sm',
			}}
		>
			<TableToolbar handleSearchCharacters={handleSearchCharacters} />
			<Table
				stickyHeader
				stickyFooter
				sx={{
					'& thead th:nth-child(0)': {
						width: ['auto', '40px'],
					},
					'& thead th:nth-child(1)': {
						width: ['auto', '20%'],
					},
					'& tr > *:nth-child(n+2)': { textAlign: 'right' },
				}}
			>
				<TableHead
					order={order}
					orderBy={orderBy}
					onRequestSort={handleRequestSort}
				/>
				<tbody>
					{data
						? stableSort(data.results, getComparator(order, orderBy)).map(
								(row) => {
									return (
										<tr tabIndex={-1} key={row.name}>
											<th id={row.name} scope="row">
												{row.name}
											</th>
											<td>{row.height}</td>
											<td>{row.mass}</td>
											<td>{formatDate(row.created)}</td>
											<td>{formatDate(row.edited)}</td>
											<td>
												{planets ? (
													<Link
														onClick={() =>
															setPlanet(getPlanet(planets, row.homeworld))
														}
													>
														{getPlanet(planets, row.homeworld)?.name}
													</Link>
												) : (
													<Skeleton variant="text" level="body-xs" />
												)}
											</td>
										</tr>
									);
								}
						  )
						: generateSkeletonRow}
				</tbody>
				<TableFooter
					data={data}
					page={page}
					rowsPerPage={rowsPerPage}
					handleChangePage={handleChangePage}
					getLabelDisplayedRowsTo={getLabelDisplayedRowsTo}
				/>
			</Table>
		</Sheet>
	);
}
