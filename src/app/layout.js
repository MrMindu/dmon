"use client"
import { BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
        {children}
      </body>
    </html>
  );
}
