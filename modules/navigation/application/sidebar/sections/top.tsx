'use client'

import Icon from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRoom } from "@/modules/room/application/store/room"
import { ChevronsUpDown, CommandIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function SidebarTopSection() {

  const { currentRoom, rooms, setCurrentRoom } = useRoom()
  const [openRoomSelector, setOpenRoomSelector] = useState<boolean>(false)

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === 'o' && (e.metaKey || e.ctrlKey || e.altKey)) {
        e.preventDefault()
        setOpenRoomSelector(true)
      }
    }
    document.addEventListener('keydown', handleEvent)
    return () => document.removeEventListener('keydown', handleEvent)
  }, [])

  const handleSelectRoom = (room: typeof rooms[number]) => {
    setOpenRoomSelector(false)
    setCurrentRoom(room)
  }

  return (
    <div className='flex items-center gap-2 px-2 h-20 md:h-12 w-[225px] border-b'>
      <Popover open={openRoomSelector} onOpenChange={setOpenRoomSelector}>
        <PopoverTrigger className='w-full' asChild>
          <Button variant='secondary' className='w-full my-6 md:h-fit'>
            <div className='flex-1 flex items-center gap-2'>
              {
                currentRoom && (
                  <Icon name={currentRoom.room.iconName} size={16} />
                )
              }
              <div className='flex-1 truncate overflow-hidden w-[100px] text-start'>
                {currentRoom ? currentRoom.room.name : 'Escolher turma'}
              </div>
            </div>
            <Badge variant='secondary' className='hidden md:flex'>
              <CommandIcon className='size-4' />
              + O
            </Badge>
            <Badge variant='secondary' className='flex md:hidden'>
              <ChevronsUpDown className='size-4' />
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 w-[200px]'>
          <Command>
            <CommandInput placeholder="Pesquisar turmas" />
            <CommandEmpty></CommandEmpty>
            <CommandList>
              <CommandGroup>
                {
                  rooms.map(room => (
                    <CommandItem value={room.room.name} key={room.room.id} onSelect={() => {
                      handleSelectRoom(room)
                    }}
                    >
                      <Label className='flex-1 truncate'>
                        {room.room.name}
                      </Label>
                      <Icon name={room.room.iconName} size={16} />
                    </CommandItem>
                  ))
                }
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/*       
      {currentRoom?.room.iconName && <Icon size={20} name={currentRoom?.room.iconName} />}
      <Label className='flex-1 truncate text-sm'>
        {currentRoom?.room.name}
      </Label>
      <ChevronsUpDown className='size-4 text-muted-foreground' /> */}
    </div>
  )
}