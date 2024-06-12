import { GeistSans } from "geist/font/sans";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import UserMenu from '../components/UserMenu'
import "./globals.css";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Prept AI",
  description: "The application that allows users to search research individuals and get data to prepare you for interaction.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-prept-color-header-gray-black text-black">
        <header className="flex items-center justify-between h-20 w-full bg-gray-300 px-4">
          <div className="flex items-center">
            <Link href={"/"}>
              <div className='text-4xl text-prept-color-main-green'>
                Prept.AI
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <AuthButton />
            <UserMenu user={user} />
          </div>
        </header>
        <main className="min-h-screen flex flex-col items-center pt-4 pb-6">
          {children}
        </main>
        <footer className="w-full border-t border-gray-300 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <div className="text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Prept AI. All rights reserved.
              </div>
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
                <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
              </div>
              <div className="flex space-x-4">
                {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.81V14.708h-3.48v-3.618h3.48V8.291c0-3.451 2.103-5.329 5.171-5.329 1.471 0 2.736.109 3.102.159v3.598l-2.127.001c-1.664 0-1.988.79-1.988 1.948v2.555h3.975l-.519 3.618h-3.457V24h6.78c.732 0 1.325-.593 1.325-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.555-2.002.959-3.127 1.184-.897-.959-2.177-1.555-3.594-1.555-2.717 0-4.917 2.2-4.917 4.917 0 .385.045.761.127 1.122C7.691 8.094 4.066 6.13 1.64 3.161c-.422.722-.666 1.561-.666 2.475 0 1.708.869 3.215 2.188 4.099-.806-.026-1.566-.247-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.621-.031-.921-.086.631 1.953 2.445 3.376 4.604 3.417-1.68 1.316-3.808 2.1-6.104 2.1-.398 0-.79-.023-1.177-.069 2.188 1.396 4.768 2.211 7.557 2.211 9.054 0 14.001-7.496 14.001-13.986 0-.213-.005-.425-.014-.637.961-.695 1.8-1.562 2.462-2.549z" />
                  </svg>
                </a> */}
                <a href="https://www.linkedin.com/company/100270847" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.23 0H1.771C.792 0 0 .771 0 1.771v20.457C0 23.229.792 24 1.771 24H22.23C23.209 24 24 23.229 24 22.229V1.771C24 .771 23.209 0 22.23 0zM7.077 20.452H3.765V9.049h3.312v11.403zM5.421 7.661C4.254 7.661 3.292 6.7 3.292 5.531 3.292 4.363 4.254 3.4 5.421 3.4 6.59 3.4 7.552 4.363 7.552 5.531 7.552 6.7 6.59 7.661 5.421 7.661zM20.452 20.452h-3.312v-5.987c0-1.428-.03-3.262-1.99-3.262-1.993 0-2.297 1.552-2.297 3.153v6.096h-3.312V9.049h3.179v1.561h.046c.443-.842 1.52-1.728 3.126-1.728 3.34 0 3.958 2.201 3.958 5.067v6.502z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html >
  );
}
