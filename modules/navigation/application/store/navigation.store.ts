import { create } from "zustand"

type StoreValues = {
  openSheet: boolean
}

type StoreFunctions = {
  setOpenSheet: (e: StoreValues['openSheet']) => void
}

type Store = StoreValues & StoreFunctions

const initialStoreValues: StoreValues = {
  openSheet: false
}

export const useNavigation = create<Store>((set) => ({
  ...initialStoreValues,
  setOpenSheet: e => set({ openSheet: e })
}))