"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegUser, FaSearch, FaRegHeart, FaCartPlus } from "react-icons/fa";

const DesktopView = () => {
    
    return (
        <nav>
            <div className="flex items-center justify-between p-5">
                <div style={{ marginRight: "10rem" }}></div>
                <ul className="flex justify-center items-center gap-20">
                    <li className="nav-item">
                        <Link href="/" className="font-semibold">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" className="font-semibold">Shop</Link>
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
    return (
        <nav>Mobile view</nav>
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
