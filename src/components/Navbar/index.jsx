"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegUser, FaSearch, FaRegHeart, FaCartPlus } from "react-icons/fa";

const DesktopView = () => {
    return (
        <nav className="lg:block md:block hidden bg-primary fixed w-full z-50">
            <div className="flex items-center justify-between p-5">
                <div style={{ marginRight: "10rem" }}></div>
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
                    <Link href="#"><FaRegUser /></Link>
                    <Link href="#"><FaSearch /></Link>
                    <Link href="#"><FaRegHeart /></Link>
                    <Link href="#"><FaCartPlus /></Link>
                </div>
            </div>
        </nav>
    );
};

const MobileView = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <div className="text-white font-bold">Logo</div>
                <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none">
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
                    <a href="#" className="block text-white py-2">Menu Item 1</a>
                    <a href="#" className="block text-white py-2">Menu Item 2</a>
                    <a href="#" className="block text-white py-2">Menu Item 3</a>
                </div>
            )}
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
