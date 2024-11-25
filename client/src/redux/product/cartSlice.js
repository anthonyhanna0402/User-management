import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name:'cart',
  initialState: {
    currentCart:[],
    totalPrice:0,
  },
  reducers:{
    addToCart:(state, action) => {
      const item = state.currentCart.find(item=>item._id===action.payload._id);
      if(item) {
        item.quantity+=1;
      } else {
        state.currentCart.push({...action.payload, quantity:1});
      }
    },
    subtractFromCart:(state, action)=> {
      state.currentCart=state.currentCart.filter((item)=>item._id!==action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.currentCart.find((i) => i._id === id);
      if (item && quantity > 0) {
          item.quantity = quantity;
      }
    },
  }
})

export const {addToCart, subtractFromCart, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;