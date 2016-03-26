import poetryData from '../data/poems.json';
import Poem from '../poem/model';

const savePoem = async data => {
    try {
        const dbPoem = new Poem(data);
        return await dbPoem.save();
    } catch (err) {
        throw new Error(err);
    }
}

export default async () => {
    poetryData.forEach(async authorData => {
        try {
            return await authorData.map(savePoem);
        } catch (err) {
            throw new Error(err);
        }
    });
}
