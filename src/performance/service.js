import debug from 'debug';
import Performance from './model';

import {
    uploadFileToS3,
    getAudioUrl,
} from '../storage/aws-s3-storage';

const log = debug('ap.performance.service'); // eslint-disable-line no-unused-vars

export const createPerformance = async (key, userId, poemId, dateRecorded) => {
    const performance = new Performance({
        key,
        userId,
        poemId,
        dateRecorded,
    })

    return performance.save();
}

export const findById = async _id => {
    return await Performance
    .findOne({ _id });
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

export const findByUserId = async userId => {
    const performances = await Performance
    .find({ userId });

    const $performances = performances.map(async perf => {
        const performance = perf.toObject();
        const url = await getAudioUrl(performance.key);
        performance.url = url;

        performance.id = performance._id;
        ['_id', '__v'].forEach(key => delete performance[key]);

        return performance;
    });

    return await Promise.all($performances);
}

export const getPerformanceFeed = async () => {
    return await Performance.find();
}
