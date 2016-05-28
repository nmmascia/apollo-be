import usersData from '../data/users.json';
import User from '../user/model';

const saveUser = async data => {
    try {
        const dbUser = new User(data);
        return await dbUser.save();
    } catch (err) {
        throw new Error(err);
    }
}

export default async () => {
    try {
        return await usersData.map(saveUser);
    } catch (err) {
        throw new Error(err);
    }
}
