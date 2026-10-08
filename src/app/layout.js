import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "SMA Negeri 9 Semarang",
  description: "Website profil SMA Negeri 9 Semarang",
};

const judul = Montserrat({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-judul",
});


export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className={`min-h-full flex flex-col bg-white text-gray-900 ${judul.variable}`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
