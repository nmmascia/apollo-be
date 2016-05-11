import debug from 'debug';
import Router from 'koa-router';

import {
    createUser,
    createToken,
    findById,
    findByUsername,
    updateCurrentPoemForUser
} from './service';

import {
    findById as findPoemById,
    getRandomPoem,
} from '../poem/service';

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

router.post('/auth', async ctx => {
    const { username, password } = ctx.request.body;
    let user = null;

    try {
        user = await findByUsername(username);
        await user.validatePassword(password);
        ctx.body = await createToken(user);
    } catch (err) {
        ctx.throw('There was an error!', 500);
    }
});

router.get('/:id/profile', async ctx => {
    const user = await findById(ctx.params.id);
    const currentPoem = await findPoemById(user.currentPoemId);
    ctx.body = {
        user,
        currentPoem,
    };
});

router.put('/:id/next-poem', async ctx => {
    const poem = await getRandomPoem();
    const user = await updateCurrentPoemForUser(ctx.params.id, poem.id);

    ctx.body = {
        userId: user._id,
        poem,
    };
});

router.get('/:id', async ctx => {
    ctx.body = await findById(ctx.params.id);
});

export default () => router.routes();
