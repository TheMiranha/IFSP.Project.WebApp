import { create } from "zustand"

type StoreValues = {
  active: boolean
}

type StoreFunctions = {
  setActive: (e: StoreValues['active']) => void
}

type Store = StoreValues & StoreFunctions

const initialValues: StoreValues = {
  active: false
}

export const useLoading = create<Store>((set) => ({
  ...initialValues,
  setActive: e => set({ active: e })
}))