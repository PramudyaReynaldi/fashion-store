import { Mulish } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@mui/material/Container";

import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Fashion Store",
  description: "Author by reytech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <Navbar />
          <Container>
            {children}
          </Container>
        <Footer />
      </body>
    </html>
  );
}
