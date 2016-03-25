import fetch from 'isomorphic-fetch';
import fs from 'fs';
import mkdirp from 'mkdirp';

const poetrydb = 'http://poetrydb.org';

const getAuthors = async () => {
    try {
        const url = `${poetrydb}/author`;
        const response = await fetch(url);
        if (response.ok) return response.json();
        else throw new Error('not ok');
    } catch (err) {
        throw new Error(err);
    }
}

const getPoemsForAuthor = async authorName => {
    try {
        const url = `${poetrydb}/author/${authorName}`;
        const response = await fetch(url);
        if (response.ok) return response.json();
        else throw new Error('not ok');
    } catch (err) {
        throw new Error(err);
    }
}

const getAllPoems = ({ authors }) => {
    const $poems = authors.map(getPoemsForAuthor);
    return Promise.all($poems);
}

const writePoems = data => {
    const path = './src/data';
    const file = 'poems.json';
    const json = JSON.stringify(data);
    mkdirp(path, err => {
        fs.writeFile(`${path}/${file}`, json, 'utf8', err => {
            if (err) throw new Error(err);
        });
    });
}

getAuthors()
.then(getAllPoems)
.then(writePoems)
.catch(err => throw new Error(err));
