import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  defaultBucket: string;
  storage: Storage;

  constructor() {
    if (!process.env.STORAGE_BUCKET)
      throw new Error('Storage bucket name was not defined in environment!');

    this.defaultBucket = process.env.STORAGE_BUCKET;
    this.storage = new Storage();
  }

  async upload() {
    // TODO: Implement method
  }
}
