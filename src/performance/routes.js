import debug from 'debug';
import Router from 'koa-router';
import slug from 'slug';

import {
    createPerformance,
    findById,
    uploadPerformanceToStorage,
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
    const MOCK_PERFORMANCES = [
        {
            id: '1',
            title: 'Hello',
            author: 'mr.hallo',
            dateRecorded: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Hello',
            author: 'mr.hallo',
            dateRecorded: new Date().toISOString(),
        },
        {
            id: '3',
            title: 'Hello',
            author: 'mr.hallo',
            dateRecorded: new Date().toISOString(),
        },
        {
            id: '4',
            title: 'Hello',
            author: 'mr.hallo',
            dateRecorded: new Date().toISOString(),
        },
        {
            id: '5',
            title: 'Hello',
            author: 'mr.hallo',
            dateRecorded: new Date().toISOString(),
        },
    ];

    const { userId } = ctx.request.query;

    ctx.body = {
        userId,
        performances: MOCK_PERFORMANCES,
    };
});

router.post('/create', async ctx => {
    try {
        const { userId, poemId } = ctx.request.body;
        const file = ctx.request.files[0];

        const { username } = await findUserById(userId);
        const { title } = await findPoemById(poemId);

        const slugTitle = slug(title, { lowercase: true });

        const { Key } = await uploadPerformanceToStorage(file, username, slugTitle);
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
