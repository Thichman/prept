import { GeistSans } from "geist/font/sans";
import AuthButton from "@/components/AuthButton";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Prept AI",
  description: "The application that allows users to search research individuals and get data to prepare you for interaction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-prept-color-header-gray-black text-black">
        <header className="flex items-center justify-between h-20 w-full bg-gray-300 px-4">
          <div className="flex items-center">
            <div className='text-4xl text-prept-color-main-green'>
              Prept.AI
            </div>
          </div>
          <div className="flex items-center">
            <AuthButton />
          </div>
        </header>
        <main className="min-h-screen flex flex-col items-center pt-4">
          {children}
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>

            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
