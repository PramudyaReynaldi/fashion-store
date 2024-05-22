import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import CartContext from "@/context/CartContext";

const CardProduct = ({ category, titleProduct, price, image, productId }) => {
    const { addToCart } = useContext(CartContext);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        addToCart({ titleProduct, price, image, productId, quantity: 1 });
        setAddedToCart(true);
    };
    

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="relative overflow-hidden w-full h-64">
                <Image 
                    className="object-contain object-center w-full h-full block" 
                    width={300} 
                    height={300} 
                    src={image} 
                    alt={titleProduct} 
                />
                <div className="absolute inset-0 opacity-40"></div>
                <Link href={`/detail-product/${productId}`} className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">View Product</button>
                </Link>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-4 overflow-hidden whitespace-nowrap text-ellipsis">{titleProduct}</h3>
            
            <div className="flex items-center justify-between mt-4">
                <span className="text-gray-900 font-bold text-lg">${price}</span>
                {!addedToCart ? (
                    <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800" onClick={handleAddToCart}>Add to Cart</button>
                ) : (
                    <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Added to Cart</button>
                )}
            </div>
        </div>
    );
};

export default CardProduct;
