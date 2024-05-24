import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
});

export async function POST(request) {
    const cartItems = await request.json();
    const orderId = Math.floor(Math.random() * 1000000);

    // Construct the item_details array
    const itemDetails = cartItems.map((item) => ({
        id: orderId,
        price: item.price,
        quantity: item.quantity,
        name: item.titleProduct.substring(0, 50)
    }));

    // Calculate the gross amount
    const grossAmount = itemDetails.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Prepare the parameter for the transaction
    let parameter = {
        "transaction_details": {
            "order_id": orderId,
            "gross_amount": grossAmount
        },
        "item_details": itemDetails
    };

    const token = await snap.createTransactionToken(parameter);
    console.log("token: ", token);
    return NextResponse.json({ token });
}



