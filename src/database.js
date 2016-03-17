import debug from 'debug';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const log = debug('ap.database');

export default cfg => {
    const { uri } = cfg;
    mongoose.connect(uri);

    const db = mongoose.connection;
    db.once('open', () => log('db open'));
    db.on('connected', () => log(`db connected at ${uri}`));
    db.on('error', err => log(`db error: ${err}`));
    return db;
};
