"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Grid } from "@mui/material";

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

    const handleChange = (event, newValue) => setValue(newValue);

    const fetchData = async (url, setter, errorMessage) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`
            );
            const data = await response.json();

            console.log(`${setter.name} from API:`, data);

            setter(data);
        } catch (error) {
            console.log(`Error fetching ${errorMessage}:`, error);
        }
    };

    // Fetch data
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
        <section>
            <div className="mb-3">
                <h3 className="text-3xl text-center font-bold">
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
                    <Grid container item xs={12} spacing={2} className="pt-10">
                        {filterProducts.map((product) => (
                            <Grid item xs={3} key={product.id}>
                                <img src={product.image} alt={product.title} />
                                <h3>{product.title}</h3>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            ))}
        </section>
    );
};

export default Categories;
