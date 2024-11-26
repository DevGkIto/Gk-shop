import { create } from "zustand";

interface ProductState {
  shirtSize: string;
  customDescription: string;
  productQuantity: number;

  sheetOpen: boolean;

  setShirtSize: (size: string) => void;
  setCustomDescription: (description: string) => void;
  setProductQuantity: (quantity: number) => void;

  openSheet: () => void;
  closeSheet: () => void;
}

const useProductStore = create<ProductState>((set) => ({
  shirtSize: "",
  customDescription: "",
  productQuantity: 1,

  sheetOpen: false,

  setShirtSize: (size) => set({ shirtSize: size }),
  setCustomDescription: (description) =>
  set({ customDescription: description }),
  setProductQuantity: (quantity) => set({ productQuantity: quantity }),

  openSheet: () => set({ sheetOpen: true }),
  closeSheet: () => set({ sheetOpen: false }),
}));

export default useProductStore;
