import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className='container flex items-center justify-center h-screen'>
			<Card>
				<CardHeader>
					<CardTitle>Text Cat</CardTitle>
					<CardDescription>
						Cat-related hastebin clone
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Hello world!</p>
				</CardContent>
				<CardFooter>
					<div class='flex gap-2'>
						<Button
							onClick={() => {
								navigate('/paste/create');
							}}
						>
							<FaPlus />
						</Button>
						<Button
							variant='outline'
							onClick={() => {
								window
									.open(
										'https://github.com/andriemc/textcat',
										'_blank'
									)
									?.focus();
							}}
						>
							<FaGithub />
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
