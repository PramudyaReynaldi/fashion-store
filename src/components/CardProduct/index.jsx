import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";

const CardProduct = ({ category, titleProduct, price, image, productId }) => {
    return (
        <div className="p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
                <Image
                    alt={titleProduct}
                    className="object-contain object-center w-full h-full block"
                    width={300}
                    height={300}
                    src={image}
                />
                <div className="overlay">
                    <button>
                        <FaCartPlus />
                        Add Cart
                    </button>
                </div>
            </a>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {titleProduct}
                </h2>
                <p className="mt-1 font-semibold">${price}</p>
            </div>
            <div className="flex items-center flex-wrap">
                <Link href={`/detail-product/${productId}`} className="flex items-center font-semibold py-2">
                    View Detail
                    <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default CardProduct;
