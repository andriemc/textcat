import {
	IRequest,
	Router,
	createCors,
	error,
	json,
	withParams,
} from 'itty-router';
import { detail } from './util';

type TCRequest = IRequest | Request;

export interface Env {
	textcat: KVNamespace;
}

interface Paste {
	id: string;
	content: string;
}

const cors = createCors({ origins: ['*'] });
const router = Router();
router.all('*', cors.preflight);
router.all('*', withParams);
let env: Env;

async function getPaste(id: string): Promise<Paste> {
	const data = JSON.parse(
		(await env.textcat.get('paste_' + id)) as unknown as string
	);

	return data as unknown as Paste;
}

async function createPaste(id: string, content: string): Promise<Paste> {
	await env.textcat.put(
		'paste_' + id,
		JSON.stringify({ id, content } as Paste)
	);

	return { id, content } as Paste;
}

router.all('/', () => json(detail('Hello Earth!')));

router.get('/paste/:id', async ({ id }) => {
	if (!id) return json(detail('No id was specified'), { status: 400 });

	const paste = await getPaste(id);
	if (paste) {
		return json({ id: paste.id, content: paste.content });
	} else {
		return json(detail('Paste not found'), { status: 404 });
	}
});

router.post('/paste', async (r: TCRequest) => {
	const { id, content } = (await r.json()) as { id: string; content: string };
	if (!id) return json(detail('No id was specified'), { status: 400 });

	const data = await createPaste(id, content);
	return json({ id: data.id });
});

router.all('*', () => json(detail('Not Found'), { status: 404 }));

export default {
	fetch: (request: TCRequest, envi: Env, ctx: ExecutionContext) => {
		env = envi;
		return router
			.handle(request, envi, ctx)
			.then(cors.corsify)
			.catch(error);
	},
};
