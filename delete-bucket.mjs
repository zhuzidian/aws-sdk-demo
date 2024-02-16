import { S3Client, DeleteObjectCommand, DeleteBucketCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"; // ES Modules import

const bucketName = "zhu-20240216"

const client = new S3Client();

const listObjectsV2Request = { // ListObjectsV2Request
  Bucket: bucketName,
};
const listObjectsV2Command = new ListObjectsV2Command(listObjectsV2Request);
const listObjectsV2Response = await client.send(listObjectsV2Command);
console.log('listObjectsV2Response', listObjectsV2Response)

if (listObjectsV2Response.Contents) {
  for (const obj of listObjectsV2Response.Contents) {
    const deleteObjectRequest = { // DeleteObjectRequest
      Bucket: bucketName,
      Key: obj.Key
    };
    const deleteObjectCommand = new DeleteObjectCommand(deleteObjectRequest);
    const deleteObjectResponse = await client.send(deleteObjectCommand);
    console.log('deleteObjectResponse', deleteObjectResponse)
  }
}

const deleteBucketRequest = { // DeleteBucketRequest
  Bucket: bucketName, // required
};
const deleteBucketCommand = new DeleteBucketCommand(deleteBucketRequest);
const deleteBucketResponse = await client.send(deleteBucketCommand);
console.log('deleteBucketResponse', deleteBucketResponse)
