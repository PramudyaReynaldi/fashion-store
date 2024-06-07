import { Mulish } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Script from "next/script";

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
                <CartProvider>
                    <CurrencyProvider>
                        <Navbar />
                        <main className="min-h-screen pt-20">
                            {children}
                        </main>
                        <Footer />
                    </CurrencyProvider>
                </CartProvider>

                <Script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={process.env.NEXT_PUBLIC_CLIENT}
                />
            </body>
        </html>
    );
}
