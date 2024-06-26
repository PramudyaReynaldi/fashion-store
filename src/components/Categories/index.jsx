"use client";

import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Typography, Grid } from "@mui/material";
import CardProduct from "../CardProduct";
import CurrencyContext from '@/context/CurrencyContext';

const TabPanel = ({ value, index, children }) => (
    <div hidden={value !== index}>
        {value === index && <Typography component="div">{children}</Typography>}
    </div>
);

const Categories = () => {
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);

    const { convertPrice } = useContext(CurrencyContext);

    const handleChange = (event, newValue) => setValue(newValue);

    // Entry point for fetching data
    const fetchData = async (url, setter, errorMessage) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`
            );
            const data = await response.json();

            console.log(`${setter.name} from API:`, data);

            // Konversi harga produk jika url adalah "products"
            if (url === "products") {
                const convertedData = data.map(product => ({
                    ...product,
                    price: convertPrice(product.price)
                }));
                setter(convertedData);
            } else {
                setter(data);
            }
        } catch (error) {
            console.log(`Error fetching ${errorMessage}:`, error);
        }
    };

    // Fetch data categories & products
    const getCategories = () => fetchData("products/categories", setCategories, "categories");
    const getProducts = () => fetchData("products", setProducts, "products");

    // Filter products by category
    const filterProductsByCategory = (category) => {
        const updatedProducts = products.filter(
            (product) => product.category === category
        );
        setFilterProducts(updatedProducts);
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    // Set the default category
    useEffect(() => {
        if (categories.length > 0) {
            filterProductsByCategory(categories[0]);
        }
    }, [categories]);

    return (
        <section className="mt-10">
            <div className="mb-3">
                <h3 className="lg:text-3xl text-2xl text-center font-bold">
                    Our Categories
                </h3>
            </div>
            <Tabs value={value} onChange={handleChange} centered>
                {categories.map((category, index) => (
                    <Tab
                        key={index}
                        label={category}
                        onClick={() => filterProductsByCategory(category)}
                    />
                ))}
            </Tabs>

            {categories.map((category, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <Grid container spacing={2} className="mt-3">
                        {filterProducts.map((product) => (
                            <Grid item xs={12} md={4} lg={3} key={product.id}>
                                <CardProduct
                                    category={product.category}
                                    titleProduct={product.title}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price.toLocaleString('id-ID')}
                                    productId={product.id}
                                    rating={product.rating.count}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            ))}
        </section>
    );
};

export default Categories;
