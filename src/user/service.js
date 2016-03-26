import debug from 'debug';
import User from './model';

const log = debug('ap.user.service');

export const createUser = async ({ username, password }) => {
    const user = new User({ username, password });
    return await user.save();
};

export const findById = async _id => {
    try {
        return await User
        .findOne({ _id })
        .select({ password: 0, __v: 0 });
    } catch (err) {
        throw new Error(err);
    }
}
