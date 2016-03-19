import debug from 'debug';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = debug('ap.poem.model'); // eslint-disable-line no-unused-vars

const poemSchema = new Schema({
    title: String,
    author: String,
    lines: [String],
});

export default mongoose.model('Poem', poemSchema);

// todo
// poetrydb isn't particularly fast
// should consume api
