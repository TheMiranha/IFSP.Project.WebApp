'use client'

import { useRoom } from "./store/room"
import { useEffect } from "react"
import { getUserRooms } from "../domain/room.actions"
import { RoomsTableDialog } from "./roomsTableDialog"
import { CreateRoomDialog } from "./createRoomDialog"

export function RoomDialog() {

  const { setOpenRoomsTableDialog, setRooms } = useRoom()

  const loadRooms = async () => {
    const response = await getUserRooms()
    setRooms(response.rooms)
    if (response.rooms.length === 0) {
      setOpenRoomsTableDialog(true)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  return (
    <>
      <RoomsTableDialog />
      <CreateRoomDialog />
    </>
  )

}
