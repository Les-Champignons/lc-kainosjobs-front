import * as fs from "fs";
import * as AWS from "aws-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;








export const uploadFileToS3 = async (bucketName: string, key: string, fileURL: string): Promise<void> => {
    //read file in using filestream based off fileURL
    const readableStream = fs.createReadStream(fileURL, 'utf8');

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })

    readableStream.on('data', (chunk) => {
        console.log(chunk);
    })
    // Create S3 client
    const s3Client = new S3Client({
        region: '',
        credentials: {
            accessKeyId: IAM_USER_KEY ?? 'default  string',
            secretAccessKey: IAM_USER_SECRET ?? 'default  string'
        }
    });

    // Set upload parameters
    // Pass in BUCKET_NAME, filestream, IAM_USER_KEY
    const params = {
        Body: readableStream,
        Bucket: bucketName,
        Key: key,
    };

    try {
        // Upload file to S3
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        console.log("File uploaded successfully", response);
    } catch (error) {
        console.error("Error uploading file", error);
    }
}
  