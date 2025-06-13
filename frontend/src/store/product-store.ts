// store/product-store.ts
import { create } from "zustand"
import { Product } from "@/types"

interface ProductStore {
  products: Product[]
  setProducts: (products: Product[]) => void
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}))

export default useProductStore
