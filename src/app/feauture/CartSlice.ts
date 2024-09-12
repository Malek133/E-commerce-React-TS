
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddItemToShoppingCart } from '@/utils';
import { WritableDraft } from 'immer';

interface ICartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; 
  //  attributes:any
}

export interface CartState {
  CartProducts:ICartProduct[];
}

const initialState: CartState = {
  CartProducts: [],
};



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
     
       state.CartProducts = AddItemToShoppingCart(action.payload, state.CartProducts as WritableDraft<ICartProduct>[]);
      
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
        state.CartProducts = state.CartProducts.filter(item =>item.id != action.payload)
              
        
          },
          clearFromCart:state => {
            state.CartProducts = []
           
            
              }
  },
});

export const { addToCart,removeFromCart,clearFromCart } = cartSlice.actions;
export const selectCart = (state: RootState): CartState => state.cart;
export default cartSlice.reducer;

