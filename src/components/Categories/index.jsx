"use client";

import { useState, useEffect } from "react";
import { Tabs, Tab, Typography } from "@mui/material";

const TabPanel = ({ value, index, children }) => {
    return (
      <div hidden={value !== index}>
        {value === index && <Typography component="div">{children}</Typography>}
      </div>
    );
};

const Categories = () => {
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/categories`);
            const getData = await response.json();

            console.log("Categories from API:", getData);

            setCategories(getData);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);
    
    return (
        <section>
            <div className="mb-3">
                <h3 className="text-3xl text-center font-bold">Our Categories</h3>
            </div>
            <Tabs value={value} onChange={handleChange} centered>
                {categories.map((category, index) => (
                    <Tab key={index} label={category} />
                ))}
            </Tabs>
            {categories.map((category, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <div className="flex justify-center pt-3">
                        <h3 className="text-3xl font-bold">{category}</h3>
                    </div>
                </TabPanel>
            ))}
        </section>
    )
}

export default Categories;