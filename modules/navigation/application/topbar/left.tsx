'use client'

import Icon from "@/components/icon";
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
        <SelectTrigger className='w-[250px]'>{currentRoom?.room.name ?
          <div className='flex items-center gap-2'>
            <Icon name={currentRoom?.room.iconName} size={'20px'} /> {currentRoom?.room.name}
          </div>
          : 'Selecione uma turma'}</SelectTrigger>
        <SelectContent>
          {
            rooms.map(complexRoom => (
              <SelectItem
                key={complexRoom.room.id}
                value={complexRoom.room.id}
              >
                <div className='flex items-center gap-2'>
                  <Icon name={complexRoom.room.iconName} size={'20px'} /> {complexRoom.room.name}
                </div>
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}
