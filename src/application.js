import 'babel-polyfill';
import bodyParser from 'koa-body-parser';
import convert from 'koa-convert';
import debug from 'debug';
import Koa from 'koa';
import koaRouter from 'koa-router';
import logger from 'koa-logger';

import database from './database';
import dbConfig from '../cfg/db-config';

// Application
const app = new Koa();

// Database
app.context.db = database(dbConfig[process.env.NODE_ENV]);

// Router
const router = koaRouter();

// Logging
const log = debug('ap.application');
const errorLog = debug('ap.application.error');

// Middlewares
app.use(convert(bodyParser()));
app.use(logger());

// Routes
router.get('/', () => {
    log('!');
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
