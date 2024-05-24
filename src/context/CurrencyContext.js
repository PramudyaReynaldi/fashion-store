"use client";

import React, { createContext, useState } from "react";

const CurrencyContext = createContext();

export const convertToIDR = (usd, exchangeRate = 15000) => {
    return usd * exchangeRate;
};

export const CurrencyProvider = ({ children }) => {
    const [exchangeRate, setExchangeRate] = useState(15000);

    const convertPrice = (priceInUSD) => {
        return convertToIDR(priceInUSD, exchangeRate);
    };

    return (
        <CurrencyContext.Provider value={{ convertPrice, exchangeRate }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyContext;
