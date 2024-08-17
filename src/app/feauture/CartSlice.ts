// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';
// import { AddItemToShoppingCart } from '@/utils';


// // Define the type for the items in your cart, including an image
// interface ICartProduct {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string; // URL or path to the product's image
//   attributes: {
//     image: {
//       data: {
//         attributes: {
//           url: string;
//         };
//       };
//     };
//     price: number;
//     title: string;
//   };
// }

// interface CartState {
//   CartProducts: ICartProduct[
  
//   ];
// }

// const initialState:CartState = {
//   CartProducts: [],
// };

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//       addToCart: (state, action: PayloadAction<ICartProduct>) => {
//         // Assurez-vous que AddItemToShoppingCart renvoie bien un ICartProduct[]
//         state.CartProducts = AddItemToShoppingCart(action.payload, state.CartProducts);
//       },
//     },
//   });


// export const { addToCart } = cartSlice.actions;
// export const selectCart = (state: RootState): CartState => state.cart
// export default cartSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddItemToShoppingCart } from '@/utils';

interface ICartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; 
  attributes: {
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    price: number;
    title: string;
  };
}

interface CartState {
  CartProducts: ICartProduct[];
}

const initialState: CartState = {
  CartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      // Assurez-vous que AddItemToShoppingCart renvoie un tableau de ICartProduct
       state.CartProducts = AddItemToShoppingCart(action.payload, state.CartProducts);
      
    },

    removeFromCart: (state, action) => {
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

