import debug from 'debug';
import Router from 'koa-router';

import {
    findById,
} from './service';

const log = debug('ap.user.routes');

const router = new Router({
    prefix: '/user',
});

router.get('/:id', async ctx => {
    ctx.body = await findById(ctx.params.id);
});

export default app => app.use(router.routes());
