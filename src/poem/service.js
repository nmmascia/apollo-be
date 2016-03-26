import debug from 'debug';
import Poem from './model';

const log = debug('ap.poem.service'); // eslint-disable-line no-unused-vars

export const findById = async _id => {
    try {
        return await Poem
        .findOne({ _id })
        .select({ __v: 0 })
    } catch (err) {
        throw new Error(err);
    }
};


export const getRandomPoem = async () => {
    try {
        return await Poem
        .aggregate()
        .sample(1)
        .exec();
    } catch (err) {
        throw new Error(err);
    }
};
