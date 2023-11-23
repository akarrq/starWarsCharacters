import * as React from 'react';
import Nav from './components/Nav';
import CharactersTable from './components/CharactersTable';
import { CssVarsProvider } from '@mui/joy';

export default function App() {
	return (
		<>
			<CssVarsProvider defaultMode="dark" colorSchemeSelector="#dark">
				<div id="dark">
					<Nav />
					<CharactersTable />
				</div>
			</CssVarsProvider>
		</>
	);
}
