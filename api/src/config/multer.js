import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import crypto from 'crypto';

export default {
  storage: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) {
          return cb(error);
        }

        const filename = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (request, file, cb) => {
    const allowedMime = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    if (allowedMime.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error('Invalid type file'));
  },
}
