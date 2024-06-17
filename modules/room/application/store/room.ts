import { ProfileRoom, Room } from "@prisma/client"
import { create } from "zustand"
import { ComplexRoom } from "../../domain/types"

type StoreValues = {
  openRoomsTableDialog: boolean
  openCreateRoomDialog: boolean
  openShareRoomDialog: boolean
  openEnterRoomDialog: boolean
  rooms: ComplexRoom[]
  currentRoom: ComplexRoom | null
  currentEditRoom: ComplexRoom | null
}

type StoreFunctions = {

  setOpenRoomsTableDialog: (e: StoreValues['openRoomsTableDialog']) => void

  setOpenCreateRoomDialog: (e: StoreValues['openCreateRoomDialog']) => void

  setOpenShareRoomDialog: (e: StoreValues['openShareRoomDialog']) => void

  setOpenEnterRoomDialog: (e: StoreValues['openEnterRoomDialog']) => void

  setRooms: (e: StoreValues['rooms']) => void

  setCurrentRoom: (e: StoreValues['currentRoom']) => void

  setCurrentEditRoom: (e: StoreValues['currentEditRoom']) => void
}

type Store = StoreValues & StoreFunctions

const initialStoreValues = {
  openRoomsTableDialog: false,
  openCreateRoomDialog: false,
  openShareRoomDialog: false,
  openEnterRoomDialog: false,
  rooms: [],
  currentRoom: null,
  currentEditRoom: null
}

export const useRoom = create<Store>((set) => ({
  ...initialStoreValues,

  setOpenRoomsTableDialog: (e) => set({ openRoomsTableDialog: e }),

  setOpenCreateRoomDialog: (e) => set({ openCreateRoomDialog: e }),

  setOpenShareRoomDialog: (e) => set({ openShareRoomDialog: e }),

  setOpenEnterRoomDialog: (e) => set({ openEnterRoomDialog: e }),

  setRooms: (e) => set({ rooms: e }),

  setCurrentRoom: (e) => set({ currentRoom: e }),

  setCurrentEditRoom: (e) => set({ currentEditRoom: e }),

}))