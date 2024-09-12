

interface ICartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

 export const AddItemToShoppingCart = (
    cartItem: ICartProduct, // Ensure this type is correct
    shoppingCart: ICartProduct[] // Explicitly typing shoppingCart
): ICartProduct[] => { // Ensure the return type is correct
    const existItem = shoppingCart.find(item => item.id === cartItem.id);

    if (existItem) {
        return shoppingCart.map(item =>
            item.id === cartItem.id 
                ? { ...item, quantity: (item.quantity || 0) + 1 } 
                : item
        );
    }

    return [...shoppingCart, { ...cartItem, quantity: 1 }];
};



  