import debug from 'debug';
import Router from 'koa-router';
import slug from 'slug';

import {
    createPerformance,
    findById,
    uploadPerformanceToStorage,
    findByUserId,
    getPerformanceFeed,
} from './service';

import {
    findById as findPoemById,
} from '../poem/service';

import {
    findById as findUserById,
} from '../user/service';

const log = debug('ap.performance.routes'); // eslint-disable-line no-unused-vars

const router = new Router({
    prefix: '/performance',
});

router.get('/', async ctx => {
    const { userId } = ctx.request.query;
    const performances = await findByUserId(userId);
    const poems = await Promise.all(performances.map(async perf => findPoemById(perf.poemId)));

    ctx.body = {
        userId,
        performances,
        poems,
    };
});

router.get('/feed', async ctx => {
    const performances = await getPerformanceFeed(ctx.query.userId);
    const poems = await Promise.all(performances.map(async perf => findPoemById(perf.poemId)));
    const users = await Promise.all(performances.map(async perf => findUserById(perf.userId)));

    ctx.body = {
        performances,
        poems,
        users,
    };
});

router.post('/create', async ctx => {
    try {
        const { userId, poemId, dateRecorded } = ctx.request.body;
        const file = ctx.request.files[0];

        const { username } = await findUserById(userId);

        const poem = await findPoemById(poemId);
        const { title } = poem;

        const slugTitle = slug(title, { lowercase: true });

        const { Key } = await uploadPerformanceToStorage(file, username, slugTitle);
        const performance = await createPerformance(Key, userId, poemId, dateRecorded);

        ctx.body = {
            performance,
            poem,
            userId,
        };
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
