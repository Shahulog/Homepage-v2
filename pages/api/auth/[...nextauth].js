import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../mongodb";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt", // 推奨: JWTセッション
    maxAge: 30 * 24 * 60 * 60, // 30日間
},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email: credentials.email });
        console.log("credentials result",user);
        if (!user) return null;
        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/", // エラー時のリダイレクト先
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // usernameをnameとして設定
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name; // usernameをnameとして設定
      }
      console.log("session result",session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // 環境変数から設定
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30日間
  },
  // セッションの自動更新を有効化
  events: {
    async signIn({ user }) {
      // サインイン時の処理
    },
    async signOut({ session, token }) {
      // サインアウト時の処理
    },
    async session({ session, token }) {
      // セッション更新時の処理
    },
  },
  debug: process.env.NODE_ENV === 'development', // 開発環境でのみデバッグモードを有効
};



export default NextAuth(authOptions);