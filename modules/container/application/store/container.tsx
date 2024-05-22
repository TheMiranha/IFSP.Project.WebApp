import { create } from "zustand"

type Store = {
  height: number
  setHeight: (e: number) => void
}

export const useContainer = create<Store>((set) => ({
  height: 0,
  setHeight: height => set({ height })
}))