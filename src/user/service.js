import debug from 'debug';
import User from './model';

const log = debug('ap.user.service');

export const createUser = async ({ username, password, poemId }) => {
    const user = new User({ username, password, currentPoemId: poemId });
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

export const updateCurrentPoemForUser = async (_id, poemId) => {
    try {
        return await User
        .update({ _id }, {
            $set: { currentPoemId: poemId }
        });
    } catch (err) {
        throw new Error(err);
    }
}

export const updateUsersFollowings = async (followerId, followedId) => {
    try {
        await User.update({ _id: followerId }, {
            $push: { following: followedId },
        });

        await User.update({ _id: followedId }, {
            $push: { followedBy: followerId },
        });

        const follower = await User.findById(followerId);
        const followed = await User.findById(followedId);

        return { follower, followed };
    } catch (err) {
        throw new Error(err);
    }
}

// Authentication //

export const createToken = async user => {
    return new Promise(resolve => resolve({
        code: 'mysecrettoken',
        user,
    }));
};
