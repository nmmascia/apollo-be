import debug from 'debug';
import Router from 'koa-router';

import {
    createPerformance,
    findById,
    uploadPerformanceToStorage,
} from './service';

const log = debug('ap.performance.routes'); // eslint-disable-line no-unused-vars

const router = new Router({
    prefix: '/performance',
});

router.post('/create', async ctx => {
    try {
        const { userId, poemId } = ctx.request.body;
        const file = ctx.request.files[0];
        const { Key } = await uploadPerformanceToStorage(file, userId, poemId);
        ctx.body = await createPerformance(Key, userId);
    } catch (err) {
        log('Error: ', err)
        throw new Error(err);
    }
});

router.get('/:id', async ctx => {
    try {
        ctx.body = await findById(ctx.params.id);
    } catch (err) {
        log(err);
        throw new Error(err);
    }
});

export default () => router.routes();
