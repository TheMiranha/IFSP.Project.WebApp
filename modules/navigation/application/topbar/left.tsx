'use client'

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useRoom } from "@/modules/room/application/store/room";
import { ComplexRoom } from "@/modules/room/domain/types";

export function TopbarLeft() {

  const { rooms, currentRoom, setCurrentRoom } = useRoom()

  const handleRoomSelect = (roomId: string) => {
    const roomCursor = rooms.find(complexRoom => complexRoom.room.id === roomId)
    if (roomCursor) {
      setCurrentRoom(roomCursor)
    }
  }

  return (
    <div className='flex-1 flex items-center'>
      <Select onValueChange={handleRoomSelect} value={rooms.find(complexRoom => complexRoom.room.id === currentRoom?.room.id)?.room.id}>
        <SelectTrigger className='w-[250px]'>{currentRoom?.room.name || 'Selecione uma turma'}</SelectTrigger>
        <SelectContent>
          {
            rooms.map(complexRoom => (
              <SelectItem
                key={complexRoom.room.id}
                value={complexRoom.room.id}
              >
                {complexRoom.room.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}