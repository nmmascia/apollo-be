import asyncBusboy from 'async-busboy';

export default () => async (ctx, next) => {
    if (ctx.request.type === 'multipart/form-data') {
        const { files, fields } = await asyncBusboy(ctx.req);
        ctx.request.files = files;
        ctx.request.body = fields;
    }

    return next();
}
