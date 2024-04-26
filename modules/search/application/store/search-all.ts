import { create } from "zustand"

type Store = {
  open: boolean
  setOpen: (e: boolean) => void
}

export const useSearchAll = create<Store>((set) => ({
  open: false,
  setOpen: (e: boolean) => set({ open: e })
}))