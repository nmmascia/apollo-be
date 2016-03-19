import debug from 'debug';
import User from './model';

const log = debug('ap.user.service');

export const findById = async _id => {
    return await User
    .findOne({ _id })
    .select({ password: 0, __v: 0 });
};