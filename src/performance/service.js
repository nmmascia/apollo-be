import debug from 'debug';
import Performance from './model';

const log = debug('ap.performance.service'); // eslint-disable-line no-unused-vars

export const findById = async _id => {
    return await Performance
    .findOne({ _id })
    .select({ __v: 0 });
};