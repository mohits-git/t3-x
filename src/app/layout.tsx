import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    template: '%s | T3-X 🦆',
    default: 'Home | T3-X 🦆',
  },
  description: "Emoji-only twitter created with t3 stack.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #713200',
                padding: '16px',
                background: "black",
                color: '#fff',
              },
            }}
          />
          <TRPCReactProvider>
            <main className="container mx-auto flex flex-col items-center justify-center">
              <div className="w-full h-screen overflow-y-scroll max-w-2xl border-x border-x-white/30">
                {children}
              </div>
            </main>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
