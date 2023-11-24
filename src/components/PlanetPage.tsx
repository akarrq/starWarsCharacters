import * as React from 'react';

import {
	AspectRatio,
	Card,
	CardContent,
	CardOverflow,
	Sheet,
	Typography,
} from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import { Planet } from '../types/interface';

export default function PlanetPage({
	planet,
	setPlanet,
}: {
	planet: Planet | null;
	setPlanet: React.Dispatch<React.SetStateAction<Planet | null>>;
}) {
	return planet ? (
		<Sheet
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1000,
				padding: '2rem',
				boxSizing: 'border-box',
				backdropFilter: 'blur(10px)',
			}}
		>
			<IconButton
				onClick={() => setPlanet(null)}
				variant="plain"
				sx={{ position: 'absolute', top: '5%', right: '5%' }}
			>
				<CloseIcon />
			</IconButton>
			<Card
				sx={{
					textAlign: 'center',
					alignItems: 'center',
					height: '50%',
					width: '33%',
					'--icon-size': '100px',
				}}
			>
				<CardOverflow variant="solid" color="warning">
					<AspectRatio
						variant="outlined"
						color="warning"
						ratio="1"
						sx={{
							m: 'auto',
							transform: 'translateY(50%)',
							borderRadius: '50%',
							width: 'var(--icon-size)',
							boxShadow: 'sm',
							bgcolor: 'background.surface',
							position: 'relative',
						}}
					>
						<div>
							<TravelExploreIcon color="warning" sx={{ fontSize: '4rem' }} />
						</div>
					</AspectRatio>
				</CardOverflow>
				<Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
					{planet.name}
				</Typography>
				<CardContent sx={{ mt: 2 }}>
					<Typography level="body-md">
						The diameter of {planet.name} is {planet.diameter}, and the planet
						has a population of approximately {planet.population}. The climate
						on {planet.name} is characterized by {planet.climate}.
					</Typography>
				</CardContent>
			</Card>
		</Sheet>
	) : null;
}
