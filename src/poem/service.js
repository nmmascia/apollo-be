import debug from 'debug';
import Poem from './model';

const log = debug('ap.poem.service'); // eslint-disable-line no-unused-vars

const transformPoem = poem => {
    poem.id = poem._id;
    delete poem._id;
    delete poem.__v;
    return poem;
};

export const findById = async _id => {
    try {
        return await Poem
        .findOne({ _id });
    } catch (err) {
        throw new Error(err);
    }
};


export const getRandomPoem = async () => {
    try {
        const poems = await Poem
        .aggregate()
        .sample(1)
        .exec();

        return transformPoem(poems[0]);
    } catch (err) {
        throw new Error(err);
    }
};
