import User from '../user/model';
import Poem from '../poem/model';

import seedPoems from './seed-poems';
import seedUsers from './seed-users';

const seedDb = (count, seedFunc) => {
    if (count === 0) seedFunc();
};

export default () => {
    if (process.env.NODE_ENV === 'development') {
        [
            [User, seedUsers],
            [Poem, seedPoems],
        ].forEach(arr => {
            arr[0].find().count((err, count) => {
                seedDb(count, arr[1]);
            });
        });
    }
};
