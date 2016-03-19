import debug from 'debug';
import Router from 'koa-router';

import {
    findById,
} from './service';

const log = debug('ap.performance.model'); // eslint-disable-line no-unused-vars

const router = new Router({
    prefix: '/performance',
});

router.post('/', async ctx => {
    // todo
    // 1. send audio file to aws
    // 2. create performance
    // 3. update user to store reference
});

router.get('/:id', async ctx => {
    ctx.body = await findById(ctx.params.id);
});

export default app => app.use(router.routes());
