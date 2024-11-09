import { create } from "zustand";

interface ProductState {
  shirtSize: string;
  customDescription: string;
  productQuantity: number;
  setShirtSize: (size: string) => void;
  setCustomDescription: (description: string) => void;
  setProductQuantity: (quantity: number) => void;
}

const useProductStore = create<ProductState>((set) => ({
  shirtSize: "",
  customDescription: "",
  productQuantity: 1,
  setShirtSize: (size) => set({ shirtSize: size }),
  setCustomDescription: (description) =>
    set({ customDescription: description }),
  setProductQuantity: (quantity) => set({ productQuantity: quantity }),
}));

export default useProductStore;
