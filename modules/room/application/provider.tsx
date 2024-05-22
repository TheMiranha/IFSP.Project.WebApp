'use client'

import { useRoom } from "./store/room"
import { useEffect } from "react"
import { getUserRooms } from "../domain/room.actions"
import { RoomsTableDialog } from "./roomsTableDialog"
import { CreateRoomDialog } from "./createRoomDialog"

export function RoomModuleProvider() {

  const { setOpenRoomsTableDialog, setRooms, setLoading } = useRoom()

  const loadRooms = async () => {
    const response = await getUserRooms()
    setLoading(false)
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
