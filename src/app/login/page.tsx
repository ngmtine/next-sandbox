import { redirect } from "next/navigation";
import { FaTwitter } from "react-icons/fa";
import { auth } from "~/auth";
import { loginAction } from "~/lib/server/loginAction";

const LoginPage = async () => {
    // ログイン済みならばリダイレクト
    const session = await auth();
    if (session?.user) redirect("/");

    return (
        <main className="container mx-auto flex h-screen items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-sm text-center">
                <h1 className="mb-8 text-3xl font-bold">ようこそ</h1>
                <p className="mb-8 text-gray-400">ログインしてね</p>
                <form action={loginAction}>
                    <button //
                        type="submit"
                        className="inline-flex items-center justify-center gap-3 w-full px-4 py-3
                         bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold rounded-md transition"
                    >
                        <FaTwitter size={20} />
                        <span>Twitterでログイン / 新規登録</span>
                    </button>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;
