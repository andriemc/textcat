import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function Home() {
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
					<Button
						onClick={() => {
							window
								.open(
									'https://github.com/andriemc/textcat',
									'_blank'
								)
								?.focus();
						}}
					>
						GitHub
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
