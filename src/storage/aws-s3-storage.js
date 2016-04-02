import aws from 'aws-sdk';
import debug from 'debug';

const log = debug('ap.aws-s3-storage');

const Bucket = 'apollo-development';
const endpoint = new aws.Endpoint('s3.amazonaws.com');

const s3 = new aws.S3({ endpoint });
s3.endpoint.hostname = 's3.amazonaws.com';

export const uploadFileToS3 = (audio, key) => {
    return new Promise((resolve, reject) => {
        log('inside promise...', Date.now());
        s3.upload({ Body: audio, Bucket, Key: key }, (err, data) => {
            log('inside s3 upload...', Date.now());
            log('error:', err, 'data:', data);
            if (err) reject(err);
            resolve(data);
        });
    });
};
