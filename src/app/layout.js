"use client"
import Navbar from "./components/Navbar/Navbar";
import "../../public/global.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Charts",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
        {children}
      </body>
    </html>
  );
}
