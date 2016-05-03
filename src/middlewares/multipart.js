import asyncBusboy from 'async-busboy';
import debug from 'debug';

const log = debug('ap.multipart-middleware');

export default () => async (ctx, next) => {
    if (ctx.request.type.includes('multipart')) {
        const { files, fields } = await asyncBusboy(ctx.req);
        ctx.request.files = files;
        ctx.request.body = fields;

        log(files, fields);
    }

    return next();
}
