import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePaste } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export default function Paste() {
	const { id } = useParams() as { id: string };
	const data = usePaste(id);

	return (
		<div className='container flex items-center justify-center h-screen'>
			<Card>
				<CardHeader>
					<CardTitle>{id}</CardTitle>
				</CardHeader>
				<CardContent>{data ? data.content : 'Loading...'}</CardContent>
			</Card>
		</div>
	);
}
