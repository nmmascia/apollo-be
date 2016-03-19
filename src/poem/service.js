import debug from 'debug';
import fetch from 'isomorphic-fetch';

const log = debug('ap.poem.service'); // eslint-disable-line no-unused-vars

export const getRandomPoem = async () => {
    const response = await fetch('http://poetrydb.org/title/A Dream Within A Dream');
    return response.json();
}

export const findById = async _id => {
    const response = await fetch('http://poetrydb.org/title/A Dream Within A Dream');
    return response.json();
}