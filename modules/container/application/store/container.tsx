import { create } from "zustand"

type Store = {
  height: number
  contentHeight: number
  setHeight: (e: number) => void
  setContentHeight: (e: number) => void
}

export const useContainer = create<Store>((set) => ({
  height: 0,
  contentHeight: 0,
  setHeight: height => set({ height }),
  setContentHeight: contentHeight => set({ contentHeight })
}))