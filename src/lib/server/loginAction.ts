"use server";

import { signIn } from "~/auth";

export const loginAction = async () => {
    // 開発用のダミーログイン
    if (process.env.NEXT_PUBLIC_USE_DUMMY_LOGIN === "true") {
        await signIn("dummyProvider");
        return;
    }
    // twitterのoAuthログイン
    await signIn("twitter");
};
