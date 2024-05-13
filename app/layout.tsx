import { GeistSans } from "geist/font/sans";
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
        <main className="min-h-screen flex flex-col items-center">
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
