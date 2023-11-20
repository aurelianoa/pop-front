import NextAuth from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next"
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyMessage } from "@/app/utils/signMessage";


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          
          const result = await verifyMessage({
              message: credentials?.message || "",
              signature: credentials?.signature || "",
              address: credentials?.address || "",
          });
      
          if (result) {
            return {
              id: credentials?.address || "",
            }
          }
          return null
        } catch (e) {
          console.log(e)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? '',
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub
      session.user.name = token.sub
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET ?? '',
  },

  
}

const handler = NextAuth(authOptions);
  
export {handler as GET, handler as POST};