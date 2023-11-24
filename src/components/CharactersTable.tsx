import * as React from 'react';
import { useState, MouseEvent, useEffect, useRef, ChangeEvent } from 'react';

import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Skeleton from '@mui/joy/Skeleton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';

import { formatDate } from '../helpers/helpers';
import {
	getComparator,
	headCells,
	labelDisplayedRows,
	stableSort,
} from '../helpers/charactersTable';
import {
	Character,
	Data,
	Planet,
	TableHeadProps,
	TableToolbarProps,
} from '../types/interface';
import { TableOrder } from '../types/type';
import { Input } from '@mui/joy';

function TableHead(props: TableHeadProps) {
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

function TableToolbar(props: TableToolbarProps) {
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

export default function CharactersTable({
	setPlanet,
}: {
	setPlanet: React.Dispatch<React.SetStateAction<Planet | null>>;
}) {
	const [data, setData] = useState<Data | null>(null);
	const [planets, setPlanets] = useState<Planet[] | null>(null);
	const [order, setOrder] = useState<TableOrder>('asc');
	const [orderBy, setOrderBy] = useState<keyof Character>('name');
	const [page, setPage] = useState(1);
	const rowsPerPage: number = 10;

	const fetchData = async (page: string) => {
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

	const fetchPlanetData = async (planetURL: string) => {
		try {
			const response = await fetch(planetURL);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Planets are not loaded. Something went wrong!');
			return null;
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

	const handleRequestSort = (
		event: MouseEvent<unknown>,
		property: keyof Character
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (newPage: number) => {
		setPage(newPage);
		setData(null);
		setPlanets(null);
		fetchData(`&page=${newPage}`);
	};

	const handleSearchCharacters = (term: string) => {
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

	const getPlanet = (planets: Planet[] | null, planetURL: string) => {
		const planet = planets?.find((planet) => planet.url === planetURL);
		if (planet) {
			return planet;
		} else return null;
	};

	return (
		<Sheet
			variant="outlined"
			sx={{
				width: '90%',
				maxWidth: '1800px',
				maxHeight: '70vh',
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
						width: '40px',
					},
					'& thead th:nth-child(1)': {
						width: '20%',
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
					{data ? (
						stableSort(data.results, getComparator(order, orderBy)).map(
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
					) : (
						<tr>
							<th>
								<Skeleton variant="text" level="body-xs" />
							</th>
							<td>
								<Skeleton variant="text" level="body-xs" />
							</td>
							<td>
								<Skeleton variant="text" level="body-xs" />
							</td>
							<td>
								<Skeleton variant="text" level="body-xs" />
							</td>
							<td>
								<Skeleton variant="text" level="body-xs" />
							</td>
							<td>
								<Skeleton variant="text" level="body-xs" />
							</td>
						</tr>
					)}
				</tbody>
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
											data?.results.length === 0
												? 0
												: (page - 1) * rowsPerPage + 1,
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
			</Table>
		</Sheet>
	);
}
