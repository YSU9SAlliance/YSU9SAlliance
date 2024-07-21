import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // 始终返回一个示例用户对象，无论传入什么凭证
        return {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
        };
      },
    }),
  ],
});
