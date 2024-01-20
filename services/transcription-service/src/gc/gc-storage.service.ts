import { Injectable } from "@nestjs/common";
import { Storage } from '@google-cloud/storage';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GcStorageService {
    storage: any;
    constructor(private readonly configService: ConfigService) {
        this.storage = new Storage({
            projectId: 'mlsaas',
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

    async fetchFileContent(bucket_name: string, file_name: string): Promise<string> {
        const contents = await this.storage.bucket(bucket_name).file(file_name).download();
        return contents.toString();
    }
}