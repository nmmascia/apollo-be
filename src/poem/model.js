import debug from 'debug';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = debug('ap.poem.model'); // eslint-disable-line no-unused-vars

const poemSchema = new Schema({
    title: String,
    author: String,
    lines: [String],
    linecount: Number,
});

poemSchema.method('toJSON', function () {
    const poem = this.toObject();
    poem.id = poem._id;
    ['_id', '__v'].forEach(key => delete poem[key]);
    return poem;
});

export default mongoose.model('Poem', poemSchema);
