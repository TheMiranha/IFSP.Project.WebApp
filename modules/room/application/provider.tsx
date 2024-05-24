'use client'

import { useRoom } from "./store/room"
import { useEffect } from "react"
import { getUserRooms } from "../domain/room.actions"
import { RoomsTableDialog } from "./rooms-table-dialog"
import { CreateRoomDialog } from "./create-room-dialog"
import { useLoading } from "@/modules/loading/application/store/loading"

export function RoomModuleProvider() {

  const { setOpenRoomsTableDialog, setRooms } = useRoom()
  const { setActive } = useLoading()

  const loadRooms = async () => {
    setActive(true)
    const response = await getUserRooms()
    setRooms(response.rooms)
    if (response.rooms.length === 0) {
      setOpenRoomsTableDialog(true)
    }
    setActive(false)
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
