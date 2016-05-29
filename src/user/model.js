import bcrypt from 'bcrypt-as-promised';
import debug from 'debug';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = debug('ap.models.user'); // eslint-disable-line no-unused-vars

// todo: should pre 'save' be onCreate?

const userSchema = new Schema({
    birthdate: Date,
    currentPoemId: Schema.Types.ObjectId,
    name: String,
    password: {
        type: String,
        required: true,
    },
    performances: {
        type: [Schema.Types.ObjectId],
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String
    },
    followedBy: [Schema.Types.ObjectId],
    following: [Schema.Types.ObjectId],
});

userSchema.pre('save', async function (next) {
    log('#pre save');

    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        throw new Error(err);
    }
});

userSchema.methods.validatePassword = async function (input) {
    try {
        return await bcrypt.compare(input, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

userSchema.method('toJSON', function () {
    const user = this.toObject();
    user.id = user._id;
    ['_id', '__v', 'password'].forEach(key => delete user[key]);
    return user;
});

export default mongoose.model('User', userSchema);
