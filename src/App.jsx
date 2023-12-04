import React, { useState } from 'react';

import { CssVarsProvider } from '@mui/joy';

import Nav from './components/Nav';
import CharactersTable from './components/CharactersTable';
import PlanetPage from './components/PlanetPage';

export default function App() {
	const [planet, setPlanet] = useState(null);

	return (
		<>
			<CssVarsProvider defaultMode="dark" colorSchemeSelector="#dark">
				<div id="dark">
					<Nav />
					<CharactersTable setPlanet={setPlanet} />
					<PlanetPage planet={planet} setPlanet={setPlanet} />
				</div>
			</CssVarsProvider>
		</>
	);
}
