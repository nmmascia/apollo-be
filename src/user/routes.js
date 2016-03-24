import debug from 'debug';
import Router from 'koa-router';

import {
    createUser,
    findById,
} from './service';

const log = debug('ap.user.routes'); // eslint-disable-line no-unused-vars

const router = new Router({
    prefix: '/user',
});

router.post('/', async ctx => {
    ctx.body = await createUser(ctx.request.body);
});

router.get('/:id', async ctx => {
    ctx.body = await findById(ctx.params.id);
});

export default app => app.use(router.routes());
