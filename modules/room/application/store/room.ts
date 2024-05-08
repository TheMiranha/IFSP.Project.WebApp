import { Room } from "@prisma/client"
import { create } from "zustand"

type CurrentRoom = null | { roomId: string, profileRoomId: string }

type Store = {
  openRoomsTableDialog: boolean
  setOpenRoomsTableDialog: (e: boolean) => void

  openCreateRoomDialog: boolean
  setOpenCreateRoomDialog: (e: boolean) => void

  rooms: Room[]
  setRooms: (e: Room[]) => void

  currentRoom: CurrentRoom
  setCurrentRoom: (e: CurrentRoom) => void
}

export const useRoom = create<Store>((set) => ({
  openRoomsTableDialog: false,
  setOpenRoomsTableDialog: (e: boolean) => set({ openRoomsTableDialog: e }),

  openCreateRoomDialog: false,
  setOpenCreateRoomDialog: (e: boolean) => set({ openCreateRoomDialog: e }),

  rooms: [],
  setRooms: (e: Room[]) => set({ rooms: e }),

  currentRoom: null,
  setCurrentRoom: (e: CurrentRoom) => set({ currentRoom: e })
}))