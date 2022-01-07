import dotenv from 'dotenv'
dotenv.config()

export default {
    jwtSecret: process.env.jwtSecret ?? 'secretito',
    mongodb: process.env.mongodb ?? ' ',
    mongodbro: process.env.mongodbreadonly ?? ' ',
    mailUser: process.env.mailUser ?? ' ',
    mailPassword: process.env.mailPassword ?? ' ',
    clientUrl: process.env.clientUrl ?? '',
    bucketName: process.env.AWS_BUCKET_NAME ?? '',
    bucketRegion: process.env.AWS_BUCKET_REGION ?? '',
    accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
    secretAccessKey: process.env.AWS_SECRET_KEY ?? ''
}   