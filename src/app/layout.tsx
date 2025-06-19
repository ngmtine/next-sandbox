import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "~/components/header";
import { ThemeProvider } from "~/components/themeProvider";

import "./globals.css";

export const metadata: Metadata = {
    title: "next-sandbox",
    description: "砂場",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html
            lang="ja"
            suppressHydrationWarning // ThemeProvider使用によるエラーの抑制
        >
            <body>
                <ThemeProvider>
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
