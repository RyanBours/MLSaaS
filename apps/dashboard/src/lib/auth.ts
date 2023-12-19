// import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        // AzureADProvider({
        //     clientId: process.env.AZURE_AD_CLIENT_ID,
        //     clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        //     tenantId: process.env.AZURE_AD_TENANT_ID,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            console.log('jwt')
            if (account) {
                token.accessToken = account.access_token
                token.id_token = account.id_token;
                console.log('jwt', token)
            }
            return token
        }
    }
}