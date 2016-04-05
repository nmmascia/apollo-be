import debug from 'debug';
import Performance from './model';

import {
    uploadFileToS3,
} from '../storage/aws-s3-storage';

const log = debug('ap.performance.service'); // eslint-disable-line no-unused-vars

export const createPerformance = async (key, userId) => {
    const performance = new Performance({
        key,
        userId,
    })

    return performance.save();
}

export const findById = async _id => {
    return await Performance
    .findOne({ _id })
    .select({ __v: 0 });
};

export const uploadPerformanceToStorage = async (audio, username, poemId) => {
    log(audio, username, poemId);
    try {
        const key = `${username}/${poemId}.wav`;
        return await uploadFileToS3(audio, key);
    } catch (err) {
        throw new Error(err);
    }
}
