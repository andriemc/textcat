import { type ClassValue, clsx } from 'clsx';
import { useEffect, useState } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';

interface Paste {
	id: string;
	content: string;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function usePromise<T = any>(
	promise: Promise<any>,
	auto: boolean = true
) {
	const [state, setState] = useState<T>(null as T);

	const refresh = () => {
		return promise.then(setState);
	};

	useEffect(() => {
		if (auto === true) refresh();
	}, []);

	return [state, refresh];
}

export function useSavePaste(id: string, content: string) {
	const [data, setData] = useState<Response | null>(null);

	const refresh = () => {
		fetch(import.meta.env.VITE_SERVER + '/paste', {
			method: 'post',
			body: JSON.stringify({ id, content }),
			headers: { 'content-type': 'application/json' },
		}).then(setData);
	};

	return [data, refresh];
}

export function useFetch(
	input: RequestInfo | URL,
	init?: RequestInit | undefined,
	auto: boolean = true
) {
	const controller = new AbortController();
	const [state, refresh] = usePromise<Response | null>(
		fetch(input, { ...init, signal: controller.signal }),
		auto
	);

	useEffect(() => {
		return () => {
			controller.abort('Demounted');
		};
	}, []);

	return [state, refresh];
}

export function usePaste(id: string): null | Paste {
	const [res] = useFetch(import.meta.env.VITE_SERVER + '/paste/' + id);
	const [data, setData] = useState(null);

	useEffect(() => {
		(res as Response)?.json().then(setData);
	}, [res]);

	return data;
}
