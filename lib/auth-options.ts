import { _post } from "@/app/api/backend/api-client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60,
    // You can define your own encode/decode functions for signing and encryption
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // CredentialProvider({
    //   credentials: {
    //     email: {
    //       label: "email",
    //       type: "email",
    //       placeholder: "example@gmail.com",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const user = {
    //       id: "1",
    //       name: "John",
    //       email: credentials?.email,
    //       password: credentials?.password,
    //     };
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: "/signin", //sigin page
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string;

      return session;
    },
    // async signIn({ user, account }) {
    //   if (account && account.provider === "google" && user) {
    //     // Extract user data
    //     const { id_token: remember_token } = account;
    //     const { name, email, id: user_id } = user;
    //     // const user_id = profile?.sub;

    //     try {
    //       const response = await _post(`/users/signin`, {
    //         name,
    //         email,
    //         remember_token,
    //         user_id,
    //       });
    //       if (response.status === 200) {
    //         // Optionally handle the response if needed
    //         console.log("User data sent to backend successfully");
    //       } else {
    //         console.error(
    //           "Failed to send user data to backend",
    //           response.status,
    //         );
    //         return false;
    //       }
    //     } catch (error) {
    //       console.error("Error sending user data to backend", error);
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    // async signIn({ user, account }) {
    //   if (account && account.provider === "google" && user) {
    //     // Extract user data
    //     const { id_token: remember_token } = account;
    //     const { name, email, id: user_id } = user;
    //     // const user_id = profile?.sub;

    //     // Send user data and token to backend
    //     const { data: res } = await _post(
    //       "/users/signin",
    //       {
    //         name: name,
    //         email: email,
    //         remember_token: remember_token,
    //         user_id: user_id,
    //       },
    //       {},
    //     );
    //   }
    //   return true;
    // },
  },
};
