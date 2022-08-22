import { Injectable } from '@angular/core';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpacesService {
  s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client(environment.spacesConfig);
  }

  async uploadObject(params: any) {
    try {
      const data = await this.s3Client.send(new PutObjectCommand(params));
      console.log(
        'Successfully uploaded object: ' + params.Bucket + '/' + params.Key
      );
      console.log(
        environment.spacesConfig.endpointWithSpace + '/' + params.Key
      );
      return data;
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }
}
