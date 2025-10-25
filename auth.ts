import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "./prisma/generated/prisma/client"
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./lib/db";
import { compareSync } from "bcrypt-ts-edge";

 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:{type:'email'},
        password: {type: "password" }
      },

      async authorize(credentials, req) {
        const user = await db.user.findFirst({
          where:{
            email:credentials.email as string
          }
        })
  
        if(user && user.password){
          const isMatch = compareSync(credentials.password as string, user.password );
          // console.log("match", isMatch) 
          //pass is corrrect
          if(isMatch){
            return {
              id: user.id,
              name: user.userName,
              email: user.email,
              role: user.role,
            }
          }

          // user not found || wrong pass
          return null;
        }
          return null
        }

    }),  
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, trigger, token } : any) {
      // console.log("Session token", token)
      //set user id from token
      session.user.id = token.sub;
      session.user.role = token.role;

      //if any update on client
      if(trigger === 'update'){
        session.user.name = user.name
      }
      
      return session
    },
    async jwt({ token,user, account, profile } : any) {

      // console.log("token from jwt callback", token)
      // console.log("account from jwt callback", account)
      // console.log("profile from jwt callback", profile)
      // console.log("user from jwt callback", user)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.role = user.role
        // token.name = user.name
      }
      return token
    }
  },

  events: {
    async createUser({ user, account, profile } : any) {
      // Handle new Google users
      if (account?.provider === "google") {
        await db.user.update({
          where: { id: user.id },
          data: {
            // provider: "google",
            // providerId: account.providerAccountId,
          },
        });
      }
    },
    async linkAccount({ user, account, profile }) {
      // Handle existing users linking Google account
      if (account.provider === "google") {
        await db.user.update({
          where: { id: user.id },
          data: {
            // provider: "google",
            // providerId: account.providerAccountId,
          },
        });
      }
    },


  },

  
})