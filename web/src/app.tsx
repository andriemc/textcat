import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Router from './router';
import { Suspense } from 'preact/compat';

export default function App() {
	return (
		<div>
			<Suspense fallback='Loading...'>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</Suspense>
			<Toaster />
		</div>
	);
}
