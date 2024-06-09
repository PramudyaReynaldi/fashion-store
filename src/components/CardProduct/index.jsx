import Link from "next/link";
import Image from "next/image";

const CardProduct = ({ category, titleProduct, price, image, productId, rating }) => {
    return (
        <Link href={`/detail-product/${productId}`}>
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
                </div>

                <h2 className="font-light text-sm text-gray-400 mt-3 uppercase">{category}</h2>
                <h3 className="text-lg font-bold text-gray-900 mt-1 overflow-hidden whitespace-nowrap text-ellipsis">{titleProduct}</h3>
                
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 text-sm">Rp. {price}</span>
                    <span className="text-gray-400 text-xs">{rating} Terjual</span>
                </div>
            </div>
        </Link>
    );
};

export default CardProduct;
