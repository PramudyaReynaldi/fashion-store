"use client"

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FaRegUser, FaSearch, FaRegHeart, FaCartPlus } from "react-icons/fa";
import SidebarCart from "../SidebarCart";
import CartContext from "@/context/CartContext";

const DesktopView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems } = useContext(CartContext);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Menghitung/menggabungkan total quantity pada keranjang
    const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="lg:block md:block hidden bg-primary fixed w-full z-50">
            <div className="flex items-center justify-between p-5">
                <div>
                    <Link href="/" className="text-3xl font-extrabold">FStore</Link>
                </div>
                <ul className="flex justify-center items-center gap-20">
                    <li className="nav-item">
                        <Link href="/" className="font-semibold">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/shop" className="font-semibold">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" className="font-semibold">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" className="font-semibold">Contact</Link>
                    </li>
                </ul>
                <div className="flex items-center gap-8">
                    <Link href="#" className="text-xl"><FaRegUser /></Link>
                    <Link href="#" className="text-xl"><FaSearch /></Link>
                    <Link href="#" className="text-xl"><FaRegHeart /></Link>
                    <div className="relative">
                        <Link href="#" className="text-xl" onClick={toggleSidebar}><FaCartPlus /></Link>
                        {quantity > 0 && (
                            <span className="absolute -top-4 -right-3 text-xs bg-red-500 py-1 px-2 rounded-full text-white">
                                {quantity}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <SidebarCart isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </nav>
    );
};

const MobileView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { cartItems } = useContext(CartContext);

    const toggleSidebar = () => {
        setCartOpen(!cartOpen);
    };

    // Menghitung/menggabungkan total quantity pada keranjang
    const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <nav className="p-4 bg-primary fixed w-full z-40">
            <div className="flex items-center justify-between">
                <Link href="/" className="font-extrabold text-xl">FStore</Link>

                <Link href="#" className="text-xl"><FaRegUser /></Link>
                    <Link href="#" className="text-xl"><FaSearch /></Link>
                    <Link href="#" className="text-xl"><FaRegHeart /></Link>
                    <div className="relative">
                        <Link href="#" className="text-xl" onClick={toggleSidebar}><FaCartPlus /></Link>
                        {quantity > 0 && (
                            <span className="absolute -top-4 -right-3 text-xs bg-red-500 py-1 px-2 rounded-full text-white">
                                {quantity}
                            </span>
                        )}
                    </div>

                <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
    
            {isOpen && (
                <div className="mt-4">
                    <Link href="/shop" className="block py-2">Shop</Link>
                    <Link href="#" className="block py-2">Menu Item 2</Link>
                    <Link href="#" className="block py-2">Menu Item 3</Link>
                </div>
            )}

            <SidebarCart isOpen={cartOpen} toggleSidebar={toggleSidebar} />
        </nav>
    );
};

const Navbar = () => {
    const [windowScreen, setWindowScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowScreen(window.innerWidth <= 991);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowScreen ? <MobileView /> : <DesktopView />;
};

export default Navbar;
