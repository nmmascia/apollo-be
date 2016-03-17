import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    name: String,
    birthdate: Date,
});

mongoose.model('User', userSchema);
