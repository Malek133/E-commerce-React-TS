import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddItemToShoppingCart } from '@/utils';


// Define the type for the items in your cart, including an image
interface ICartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // URL or path to the product's image
}

interface CartState {
  CartProducts: ICartProduct[
  
  ];
}

const initialState = {
  CartProducts: [
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
    //   state.CartProducts = [...state.CartProducts, action.payload];
    state.CartProducts = AddItemToShoppingCart(action.payload,state.CartProducts)
    },
  },
});


export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState): CartState => state.cart
export default cartSlice.reducer;
