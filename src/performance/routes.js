import debug from 'debug';
import Router from 'koa-router';

import {
    findById,
    uploadPerformance,
} from './service';

const log = debug('ap.performance.routes'); // eslint-disable-line no-unused-vars

const router = new Router({
    prefix: '/performance',
});

router.post('/', async ctx => {
    try {
        log('success...');
        ctx.body = await uploadPerformance(ctx.request.files[0], 'file', 'filename');
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
