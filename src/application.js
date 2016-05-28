import 'babel-polyfill';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa-cors';
import debug from 'debug';
import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';

import database from './database';
import dbConfig from '../cfg/db-config';
import multipart from './middlewares/multipart';

import seed from './utils/seed';

// Models
import User from './user/model';
import Peformance from './performance/model';
import Poem from './poem/model';

// Routes
import userRoutes from './user/routes';
import performanceRoutes from './performance/routes';
import poemRoutes from './poem/routes';

// Application
const app = new Koa();

// Database
database(dbConfig[process.env.NODE_ENV]);

// Logging
const log = debug('ap.application');
const errorLog = debug('ap.application.error');

// Seed
seed();

// Middlewares
app.use(convert(cors()));
app.use(bodyParser());
app.use(multipart());
app.use(logger());

// Router
app.use(userRoutes());
app.use(performanceRoutes());
app.use(poemRoutes());

const router = new Router();

router.get('/', async ctx => {
    ctx.body = {
        application: 'apollo',
        status: 'ok',
    };
});

app.use(router.routes());

// Error Handling
app.on('error', err => {
    errorLog(err);
});

// Startup
const port = process.env.PORT || 8080;

app.listen(port, err => {
    if (err) errorLog(err);
    log(`Port: ${port}`);
});
