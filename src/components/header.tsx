import Link from "next/link";
import { auth } from "~/auth";
import { LoginButton } from "./loginButton";
import { LogoutButton } from "./logoutButton";
import { ThemeToggleButton } from "./themeToggleButton";

const title = process.env.NEXT_PUBLIC_TITLE;

/**
 * 画面上部ヘッダーコンポーネント
 */
export const Header = async () => {
    const session = await auth();
    const user = session?.user;
    const isLoggedIn = !!user;

    return (
        <header className="bg-base-200/80 dark:bg-base-100/100 backdrop-blur-sm shadow-xl p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    {title}
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggleButton />
                    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
                </div>
            </nav>
        </header>
    );
};
