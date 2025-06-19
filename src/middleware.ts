import { auth } from "~/auth";
export default auth;

export const config = {
    matcher: [
        // 認証が不要なパスを指定するためのmatcher
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
