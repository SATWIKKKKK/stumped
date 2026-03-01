import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "STUMPED - Ultimate Cricket Intelligence Platform",
    description:
        "The world's most advanced cricket intelligence platform. Live scores, AI-powered insights, predictive analytics, fantasy cricket, and more.",
    keywords: [
        "cricket", "live scores", "cricket analytics", "fantasy cricket",
        "cricket stats", "ICC rankings", "cricket AI", "match predictions",
    ],
    openGraph: {
        title: "STUMPED - Ultimate Cricket Intelligence Platform",
        description: "AI-powered cricket analytics, live scores, and more.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: "var(--color-card)",
                                border: "1px solid var(--color-border)",
                                color: "var(--color-foreground)",
                            },
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
