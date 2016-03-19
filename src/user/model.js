import bcrypt from 'bcrypt-as-promised';
import debug from 'debug';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = debug('ap.models.user');

const userSchema = new Schema({
    birthdate: Date,
    name: String,
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    performances: {
        type: Array,
    },
});

userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        log(err);
    }
});

userSchema.methods.validatePassword = input => bcrypt.compare(input, this.password);

export default mongoose.model('User', userSchema);
