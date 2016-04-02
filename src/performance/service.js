import debug from 'debug';
import Performance from './model';

import {
    uploadFileToS3,
} from '../storage/aws-s3-storage';

const log = debug('ap.performance.service'); // eslint-disable-line no-unused-vars

export const findById = async _id => {
    return await Performance
    .findOne({ _id })
    .select({ __v: 0 });
};

export const uploadPerformance = async (audio, username, poemId) => {
    log(audio, username, poemId);
    try {
        const key = `${username}-${poemId}`;
        return await uploadFileToS3(audio, key);
    } catch (err) {
        throw new Error(err);
    }
}
