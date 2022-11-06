import { S3 } from "aws-sdk";
import { extname } from "path";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  constructor(private s3: S3) {
    this.s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  // async save(file: string, folder: string): Promise<string> {
  //   const originalName = resolve(tmpFolder, file);

  //   const fileContent = await fs.readFile(file.path);
  //   await this.s3
  //     .putObject({
  //       Bucket: `${process.env.AWS_BUCKET}/${folder}`,
  //       Key: file,
  //       ACL: "private",
  //       Body: fileContent,
  //       ContentType: file.mimetype,
  //     })
  //     .promise();

  //   fs.unlink(file.originalName);
  //   return file.originalName;
  // }

  async get(file: string, folder: string): Promise<string> {
    try {
      const fileS3 = await this.s3
        .getObject({
          Bucket: process.env.AWS_BUCKET,
          Key: `${folder}/${file}`,
        })
        .promise();
      if (extname(file) === ".XSD") {
        console.log(fileS3.Body.toString("latin1"));
        return fileS3.Body.toString("latin1") as string;
      }
      console.log(fileS3.Body.toString());
      return fileS3.Body.toString() as string;
    } catch (error) {
      return null;
    }
  }

  // async delete(file: string, folder: string): Promise<void> {
  //   await this.s3
  //     .deleteObject({
  //       Bucket: `${process.env.AWS_BUCKET}/${folder}`,
  //       Key: file.originalName,
  //     })
  //     .promise();
  // }
}
