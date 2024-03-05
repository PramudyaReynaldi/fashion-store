"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import "swiper/css";

import { Autoplay } from 'swiper/modules';

const Banner = () => {
    const [products, setProducts] = useState([]);
    const [currentProductTitle, setCurrentProductTitle] = useState("");

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?limit=4`);
            const getData = response.data;

            setProducts(getData);

            if (getData.length > 0) setCurrentProductTitle(getData[0].title);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleSwiperSlideChange = (swiper) => {
        // Update the current product title when the slide changes
        if (swiper && swiper.slides && swiper.slides.length > 0) {
            const currentSlideIndex = swiper.realIndex;
            const currentProduct = products[currentSlideIndex];
            setCurrentProductTitle(currentProduct.title);
        }
    };

    return (
        <div className="banner-products">
            <div className="flex lg:flex-row flex-col justify-evenly items-center">
                <div className="lg:block hidden">
                    <h1 className="text-5xl font-bold title-brand-product pb-9">{currentProductTitle}</h1>
                    {products.length > 0 && <Link href="/shop" className="text-2xl font-semibold pb-2 border-b-2 border-current">Shop Now</Link>}
                </div>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={(swiper) => handleSwiperSlideChange(swiper)}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    loop={products.length > 0}
                    modules={[Autoplay]}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <Image 
                                src={product.image} 
                                alt={product.title} 
                                width={400} 
                                height={400} 
                                style={{ width:'auto', height: "auto" }}
                                priority
                            />
                        </SwiperSlide>
                    ))}   
                </Swiper>
            </div>
        </div>
    );
}

export default Banner;