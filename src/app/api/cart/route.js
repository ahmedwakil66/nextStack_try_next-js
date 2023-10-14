import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCartProductsFromDb } from "@/services/products.services";

// add to cart api
export const POST = async (request) => {
    let cart = {};
    const cookie = cookies();
    const cartCookie = cookie.get('cart-ca')?.value;
    if (cartCookie) cart = JSON.parse(cartCookie); 

    try {
        const params = request.nextUrl.searchParams;
        const productId = params.get('productId');
        const quantity = parseInt(params.get('quantity'));

        if(!productId) throw new Error("Product ID is required");
        if(!quantity && quantity !== 0) throw new Error("Quantity is required");
        if(quantity < 0 || quantity > 9) throw new Error(`Quantity must be between 0 to 9, you gave ${quantity}`);

        if(quantity > 0) cart[productId] = quantity
        else if(quantity === 0 && cart[productId]) delete cart[productId]
        else throw new Error(`A zero quantity means deleting from cart, but product id ${productId} doesn't exist in cart.`);

        cookie.set({
            name: 'cart-ca',
            value: JSON.stringify(cart),
            secure: true,
            httpOnly: true,
        })
        console.log('after set cart', cookie.get('cart-ca')?.value);

        return Response.json({ success: true, message: 'Cart updated!', cart })
    } 
    catch (error) {
        return NextResponse.json({ success: false, message: error.message, cart })
    }
}


// get cart api
export const GET = async (request) => {
    try {
        let cart;
        const cartCookie = request.cookies.get('cart-ca')?.value;
        if(cartCookie) cart = JSON.parse(cartCookie);

        if(!cart) throw new Error("Could not find a cart. Carts are not synced across devices.");

        const params = request.nextUrl.searchParams;
        const raw = params.get('raw');
        if(raw) return NextResponse.json({success: true, cart})

        const products = await getCartProductsFromDb(Object.keys(cart));
        const cartProducts = products.map(product => ({
            ...product,
            quantity: cart[product._id.toString()]
        }));

        return NextResponse.json({success: true, cart: cartProducts})
    } 
    catch (error) {
        return NextResponse.json({ success: false, message: error.message, cart: []})
    }
}