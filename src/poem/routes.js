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

router.get('/random', async ctx => {
    const poem = await getRandomPoem();

    ctx.body = {
        poems: [
            poem,
        ],
    };
});

router.get('/:id', async ctx => {
    const poem = await findById(ctx.params.id);

    ctx.body = {
        poems: [
            poem,
        ],
    };
});

export default () => router.routes();
