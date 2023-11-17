import { Injectable } from "@nestjs/common";
import { Storage } from '@google-cloud/storage';
import { join } from "path";

@Injectable()
export class GcStorageService {
    storage: any;
    constructor() {
        this.storage = new Storage({
            projectId: 'mlsaas',
            keyFilename: join(__dirname, '../../mlsaas-bf40ffa583a8.json'),
        });
    }

    async createSignedUrl(bucket_name: string, file_name: string) {
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        };

        const [url] = await this.storage
            .bucket(bucket_name)
            .file(file_name)
            .getSignedUrl(options);

        return url;
    }
}