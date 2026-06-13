import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/ThemeProvider";
import { ToastContainer } from "react-toastify";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HireEdge",
  description: "The Smart Hiring Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
