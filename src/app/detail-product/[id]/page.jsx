"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Container } from "@mui/material";
import Loading from "@/app/loading";
import CurrencyContext from "@/context/CurrencyContext";
import CartContext from "@/context/CartContext";

const DetailProductPage = ({ params }) => {
    const { id } = params;
    const [productDetail, setProductDetail] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    const { convertPrice } = useContext(CurrencyContext);
    const { addToCart } = useContext(CartContext);
    

    const handleAddToCart = () => {
        const dataProduct = {
            titleProduct: productDetail.title,
            price: productDetail.price,
            image: productDetail.image,
            productId: productDetail.id,
            quantity: 1,
        }

        addToCart(dataProduct);
        setAddedToCart(true);
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`);
                if (response.ok) {
                    // Ambil data JSON dari respons
                    const data = await response.json();
                    const { price } = data;
                    data.price = convertPrice(price);

                    setProductDetail(data);
                } else {
                    // Handle error jika permintaan gagal
                    console.error("Failed to fetch product detail");
                    setProductDetail(null);
                }
            } catch (error) {
                // Handle error jika terjadi kesalahan jaringan atau parsing JSON
                console.error("Error fetching product detail:", error);
                setProductDetail(null);
            }
        };

        fetchProductDetail();
    }, [id]);

    return (
        <Container>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="lg:py-24 py-5">
                    {productDetail ? (
                        <div className="flex flex-wrap justify-evenly">
                            <Image
                                alt="ecommerce"
                                className="lg:h-auto h-64 object-contain object-center rounded"
                                src={productDetail.image}
                                width={400}
                                height={400}
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{productDetail.category}</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productDetail.title}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-yellow-300"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        
                                        <span className="ml-2">{productDetail.rating.rate}</span>
                                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s"></span>
                                        <span className="text-gray-400 ml-2">{productDetail.rating.count} Terjual</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed">
                                    {productDetail.description}
                                </p>

                                {productDetail.category === "women's clothing" || productDetail.category === "men's clothing" ? (
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                        <div className="flex items-center">
                                            <span className="mr-3">Size</span>
                                            <div className="relative">
                                                <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                                    <option>SM</option>
                                                    <option>M</option>
                                                    <option>L</option>
                                                    <option>XL</option>
                                                </select>
                                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="flex mt-4 justify-between">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        Rp. {productDetail.price.toLocaleString("id-ID")}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {!addedToCart ? (
                                            <button 
                                                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                                Added to Cart
                                            </button>
                                        )}

                                        {/* <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                            Button
                                        </button> */}
                                    </div>
                                    {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            </section>
        </Container>
    );
};

export default DetailProductPage;
