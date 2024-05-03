import { create } from "zustand"

type Store = {
  openDialog: boolean
  setOpenDialog: (e: boolean) => void
}

export const useRoom = create<Store>((set) => ({
  openDialog: false,
  setOpenDialog: (e: boolean) => set({ openDialog: e })
}))