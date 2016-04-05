import debug from 'debug';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = debug('ap.performance.model'); // eslint-disable-line no-unused-vars

const performanceSchema = new Schema({
    key: String,
    userId: Schema.Types.ObjectId,
});

export default mongoose.model('Performance', performanceSchema);
