import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { TwitterProfile } from "next-auth/providers/twitter";
import Twitter from "next-auth/providers/twitter";
import { hashWithPepper } from "~/lib/server/hashWithPepper";

// オフライン環境での確認のため、ダミーログイン機能を提供する
const isDummyLogin = process.env.NEXT_PUBLIC_USE_DUMMY_LOGIN === "true";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        isDummyLogin
            ? // 開発用
              Credentials({
                  id: "dummyProvider",
                  name: "Dummy Login",
                  credentials: {},
                  async authorize() {
                      const dummyUser = {
                          id: "test-user-id-disguised-as-hash",
                          name: "てすとユーザー",
                          image: "https://avatar.vercel.sh/test-user.png",
                      };
                      return dummyUser; // この情報はjwtコールバックのuserオブジェクトに渡される
                  },
              })
            : // 本番用
              Twitter({
                  clientId: process.env.AUTH_TWITTER_ID,
                  clientSecret: process.env.AUTH_TWITTER_SECRET,
                  authorization: {
                      url: "https://x.com/i/oauth2/authorize", // params設定する場合はurl指定必須ぽい
                      params: { scope: "users.read tweet.read offline.access" },
                  },
              }),
    ],

    callbacks: {
        /**
         * ユーザー情報をDBに保存し、トークンにハッシュ化済みIDを格納する
         * jwtトークンが作成・更新されるたびに呼び出される
         */
        async jwt({ token, profile, account, user }) {
            // profileは初回サインイン時にのみ渡される
            if (account && profile) {
                // twitter id取得（twitterの@以降の英数字ではなく、内部で使用されているid）
                const twitterProfile = profile as TwitterProfile;
                const twitterId = twitterProfile.data.id;
                if (!twitterId) throw new Error("Twitter user ID not found in profile.");

                // ハッシュ化
                const hashedUserId = await hashWithPepper(twitterId);
                token.sub = hashedUserId; // jwtのsubjectをハッシュ化idで上書き

                // ここでpgでpostgresqlに接続してdbのユーザーマスタを更新したいところだが一旦断念 詳細下部

                // トークンには画面表示用の名前と画像を含める
                token.name = twitterProfile.data.name;
                token.picture = twitterProfile.data.profile_image_url;
            }

            // Credentialsプロバイダー経由の場合（開発用）
            // userオブジェクトにはauthorize関数から返されたダミーユーザー情報が入っている
            if (account?.provider === "dummyProvider" && user) {
                token.sub = user.id;
                token.name = user.name;
                token.picture = user.image;
            }

            return token;
        },

        /**
         * jwtトークンの情報をセッションオブジェクトに反映する
         * セッションが参照されるたびに呼び出される
         */
        async session({ session, token }) {
            if (token.sub) session.user.id = token.sub; // セッションのユーザーidをハッシュ化idに設定
            if (token.name) session.user.name = token.name as string;
            if (token.picture) session.user.image = token.picture as string;

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
});

/*

ここでpgを呼ぶとエラーになることに注意
（auth.tsはedge環境で実行されるが、pgは対応していないため）
@vercel/postgresはedge環境でも動くには動くが、websocketで通信するため、ローカルのDBコンテナと接続する設定がクソ面倒なので一旦採用しない

*/
