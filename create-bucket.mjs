import * as fs from 'fs'
import { S3Client, CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
const client = new S3Client();

const bucketName = "zhu-20240216"

const createBucketRequest = {
  Bucket: bucketName, // required
};
const createBucketCommand = new CreateBucketCommand(createBucketRequest);
const createBucketResponse = await client.send(createBucketCommand);
console.log('createBucketResponse', createBucketResponse)

const files = ['hello.txt', 'world.txt']
for (const file of files) {
  const fileContent = fs.readFileSync(file)
  const putObjectRequest = {
    "Bucket": bucketName,
    "Key": file,
    "Body": fileContent,
  };
  const putObjectCommand = new PutObjectCommand(putObjectRequest);
  const putObjectResponse = await client.send(putObjectCommand);
  console.log('putObjectResponse', putObjectResponse)
}
