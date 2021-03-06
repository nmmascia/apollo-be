import debug from 'debug';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = debug('ap.performance.model'); // eslint-disable-line no-unused-vars

const performanceSchema = new Schema({
    key: String,
    userId: Schema.Types.ObjectId,
    poemId: Schema.Types.ObjectId,
    dateRecorded: Date,
});

performanceSchema.method('toJSON', function () {
    const performance = this.toObject();
    performance.id = performance._id;
    ['_id', '__v'].forEach(key => delete performance[key]);
    return performance;
});

export default mongoose.model('Performance', performanceSchema);
