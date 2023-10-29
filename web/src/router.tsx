import { lazy } from 'preact/compat';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const Paste = lazy(() => import('./pages/paste'));
const PasteEditor = lazy(() => import('./pages/pasteEditor'));

export default function Router() {
	return (
		<Routes>
			{/* Usual pages */}
			<Route>
				<Route path='/' element={<Home />} />
				<Route path='/paste/create' element={<PasteEditor />} />
				<Route path='/paste/:id' element={<Paste />} />
			</Route>
		</Routes>
	);
}
