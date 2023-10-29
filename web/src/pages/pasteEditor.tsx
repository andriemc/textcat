import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSavePaste } from '@/lib/utils';
import { useState } from 'preact/hooks';
import { Navigate } from 'react-router-dom';

export default function PasteEditor() {
	const [id, setId] = useState(crypto.randomUUID().replaceAll('-', ''));
	const [content, setContent] = useState('');
	const [data, refresh] = useSavePaste(id, content);

	return (
		<div className='container flex items-center justify-center h-screen'>
			<Card>
				<CardHeader>
					<CardTitle>Paste Editor</CardTitle>
				</CardHeader>
				{data ? (
					<Navigate to={`/paste/` + id} />
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							(refresh as () => Promise<void>)();
						}}
					>
						<CardContent>
							<div class='grid gap-5'>
								<Input
									className='max-h-[224px]'
									value={id}
									onChange={(e: any) =>
										setId(e.target?.value)
									}
									placeholder='Id'
								/>
								<Textarea
									className='max-h-[224px]'
									value={content}
									onChange={(e: any) =>
										setContent(e.target?.value)
									}
									placeholder='Content'
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save!</Button>
						</CardFooter>
					</form>
				)}
			</Card>
		</div>
	);
}
