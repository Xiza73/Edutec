import aws from "aws-sdk";
import _config from "./config";

const region = _config.bucketRegion;
const accessKeyId = _config.accessKeyId;
const secretAccessKey = _config.secretAccessKey;

export const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
}); 

export const bucketName = _config.bucketName;
