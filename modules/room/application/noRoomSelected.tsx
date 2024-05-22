'use client'

import { Label } from "@/components/ui/label"
import { useContainer } from "@/modules/container/application/store/container"
import { useEffect } from "react"
import { useRoom } from "./store/room"

export const NoRoomSelected = () => {

  const { height } = useContainer()
  const { setOpenRoomsTableDialog, loading } = useRoom()

  useEffect(() => {
    if (!loading) {
      setOpenRoomsTableDialog(true)
    }
  }, [loading, setOpenRoomsTableDialog])

  return (
    <div style={{ height: `${height}px` }} className='grid place-items-center'>
      <Label>
        Nenhuma turma selecionada
      </Label>
    </div>
  )
}