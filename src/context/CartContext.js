"use client";

import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Ambil data dari localStorage saat inisialisasi, hanya jika komponen telah di-mount
        if (isMounted) {
            const storedCart = localStorage.getItem('cartItems');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        }
    }, [isMounted]);

    useEffect(() => {
        // Simpan cartItems ke localStorage setiap kali cartItems berubah, hanya jika komponen telah di-mount
        if (isMounted) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isMounted]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const increaseQuantity = (productId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (productId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.productId === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const removeItem = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;


