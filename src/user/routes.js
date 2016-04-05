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

router.post('/create', async ctx => {
    try {
        ctx.body = await createUser(ctx.request.body);
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/:id', async ctx => {
    ctx.body = await findById(ctx.params.id);
});

export default () => router.routes();
