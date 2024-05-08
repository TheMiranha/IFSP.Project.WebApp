import { ProfileRoom, Room } from "@prisma/client"
import { create } from "zustand"
import { ComplexRoom } from "../../domain/types"


type Store = {
  openRoomsTableDialog: boolean
  setOpenRoomsTableDialog: (e: boolean) => void

  openCreateRoomDialog: boolean
  setOpenCreateRoomDialog: (e: boolean) => void

  rooms: ComplexRoom[]
  setRooms: (e: ComplexRoom[]) => void

  currentRoom: ComplexRoom | null
  setCurrentRoom: (e: ComplexRoom | null) => void
}

export const useRoom = create<Store>((set) => ({
  openRoomsTableDialog: false,
  setOpenRoomsTableDialog: (e: boolean) => set({ openRoomsTableDialog: e }),

  openCreateRoomDialog: false,
  setOpenCreateRoomDialog: (e: boolean) => set({ openCreateRoomDialog: e }),

  rooms: [],
  setRooms: (e: ComplexRoom[]) => set({ rooms: e }),

  currentRoom: null,
  setCurrentRoom: (e: ComplexRoom | null) => set({ currentRoom: e })
}))