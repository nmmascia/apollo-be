import debug from 'debug';
import Router from 'koa-router';

import {
    findById,
    getRandomPoem,
} from './service';

const log = debug('ap.poem.routes'); // eslint-disable-line no-unused-vars

const router = new Router({
    prefix: '/poem',
});

router.get('/', async ctx => {
    ctx.body = await getRandomPoem();
});

router.get('/:id', async ctx => {
    ctx.body = await findById(ctx.params.id);
});

export default app => app.use(router.routes());
