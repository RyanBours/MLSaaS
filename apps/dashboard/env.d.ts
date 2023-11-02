namespace NodeJS {
    interface ProcessEnv {
        readonly AZURE_AD_CLIENT_ID: string;
        readonly AZURE_AD_CLIENT_SECRET: string;
        readonly AZURE_AD_TENANT_ID: string;
        readonly GOOGLE_CLIENT_ID: string;
        readonly GOOGLE_CLIENT_SECRET: string;
        readonly NEXTAUTH_URL: string;
    }
}