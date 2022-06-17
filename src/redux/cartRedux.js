

import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, { payload }) => {
      state.quantity += 1
      state.products = [...state.products, payload]
      state.total += payload.price * payload.quantity
    },
    updateProduct: (state, { payload }) => {
      state.products = state.products.map((product) =>
        product._id === payload.id &&
        product.size === payload.size &&
        product.color === payload.color
          ? { ...product, quantity: product.quantity + payload.quantity }
          : product
      )
      state.total += payload.quantity < 1 ? -payload.price : payload.price
    },
    deleteProduct: (state, { payload }) => {
      state.quantity -= 1
      state.products = state.products.filter(
        ({ _id: id, size, color }) =>
          id !== payload.id || size !== payload.size || color !== payload.color
      )
      state.total -= payload.totalPrice
    },
    initializeCart: (state) => {
      state.quantity = 0
      state.products = []
      state.total = 0
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  }
})

export const { addProduct, updateProduct, deleteProduct, initializeCart, reset } =
  cartSlice.actions
export default cartSlice.reducer