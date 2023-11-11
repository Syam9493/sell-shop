 export const addDecimals = (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
}


export const updateCart = (state) => {
    // calculate item Price 
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // calculate shipping Price (If order is over than ₹1000 then free, else ₹100 shipping )
      
    state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 100);

    // calculate tax price (15% tax)

    state.taxPrice = addDecimals(Number((0.015 * state.itemsPrice).toFixed(2)));
    // calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}