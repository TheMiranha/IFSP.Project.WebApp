'use client'

import { Label } from "@/components/ui/label"
import { useContainer } from "@/modules/container/application/store/container"
import { useEffect } from "react"
import { useRoom } from "./store/room"
import { useLoading } from "@/modules/loading/application/store/loading"

export const NoRoomSelected = () => {

  const { height } = useContainer()
  const { setOpenRoomsTableDialog } = useRoom()
  const { active } = useLoading()

  useEffect(() => {
    if (!active) {
      setOpenRoomsTableDialog(true)
    }
  }, [active, setOpenRoomsTableDialog])

  if (active) return false

  return (
    <div style={{ height: `${height}px` }} className='grid place-items-center'>
      <Label>
        Nenhuma turma selecionada
      </Label>
    </div>
  )
}