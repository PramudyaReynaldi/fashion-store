import React, { useContext } from "react";
import CartContext from "@/context/CartContext";

const SidebarCart = ({ isOpen, toggleSidebar }) => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);

    if (!isOpen) return null;

    const subtotal = cartItems.reduce((acc, item) => {
        const itemPrice = Number(item.price);
        const itemQuantity = Number(item.quantity);
        
        if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
            return acc + (itemPrice * itemQuantity);
        } else {
            return acc;
        }
    }, 0);

    const handleIncreaseQuantity = (productId) => {
        increaseQuantity(productId);
    };
    
    const handleDecreaseQuantity = (productId) => {
        decreaseQuantity(productId);
    };

    const handleRemoveItem = (productId) => {
        removeItem(productId);
    };

    return (
        <div
            className="relative z-50"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-xl">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-extrabold text-gray-900" id="slide-over-title">
                                            FStore <span className="font-medium">Cart</span>
                                        </h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={toggleSidebar}
                                            >
                                                <span className="absolute -inset-0.5"></span>
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li key={item.productId} className="flex py-6 gap-3">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-lg">
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="h-full w-full object-contain object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col gap-2">
                                                            <div className="flex flex-col text-base font-medium gap-1 text-gray-900">
                                                                <h3>{item.titleProduct}</h3>
                                                                <p>Rp. {item.price.toLocaleString('id-ID')}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty {item.quantity}</p>
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    onClick={() => handleRemoveItem(item.productId)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor={`quantity-${item.productId}`} className="sr-only">Quantity</label>
                                                            <div className="flex items-center">
                                                                <button
                                                                    type="button"
                                                                    className="text-indigo-600 focus:outline-none focus:text-indigo-800 font-extrabold"
                                                                    onClick={() => handleDecreaseQuantity(item.productId)}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    id={`quantity-${item.productId}`}
                                                                    name={`quantity-${item.productId}`}
                                                                    value={item.quantity}
                                                                    className="appearance-none border border-gray-200 rounded w-10 text-center py-1 px-2 mx-2"
                                                                    readOnly
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="text-indigo-600 focus:outline-none focus:text-indigo-800 font-extrabold"
                                                                    onClick={() => handleIncreaseQuantity(item.productId)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>Rp. {subtotal.toLocaleString('id-ID')}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping and taxes calculated at
                                        checkout.
                                    </p>
                                    <div className="mt-6">
                                        <a
                                            href="/cart"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            // onClick={handleCheckout}
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or {" "}
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={toggleSidebar}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true">
                                                    {" "}
                                                    &rarr;
                                                </span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarCart;
