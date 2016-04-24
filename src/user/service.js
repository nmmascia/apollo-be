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
        .findOne({ _id });
    } catch (err) {
        throw new Error(err);
    }
};

export const findByUsername = async username => {
    try {
        return await User
        .findOne({ username });
    } catch (err) {
        throw new Error(err);
    }
};

// Authentication //

export const createToken = async user => {
    return new Promise(resolve => resolve({
        code: 'mysecrettoken',
        user,
    }));
};
