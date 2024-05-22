'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRoom } from "./store/room"
import { ArrowRightIcon, GraduationCapIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Icon from "@/components/icon"
import { ComplexRoom } from "../domain/types"
import { cn } from "@/lib/utils"

export const RoomsTableDialog = () => {

  const { setCurrentRoom, openRoomsTableDialog, setOpenRoomsTableDialog, rooms, setOpenCreateRoomDialog } = useRoom()

  const handleCreate = () => {
    setOpenRoomsTableDialog(false)
    setOpenCreateRoomDialog(true)
  }

  const handleRoomSelect = (complexRoom: ComplexRoom) => {
    setOpenRoomsTableDialog(false)
    setCurrentRoom(complexRoom)
  }

  const EmptyRooms = () => {
    return (
      <div className='w-full flex flex-col justify-center items-center gap-2'>
        <Label>Você não está em nenhuma turma</Label>
        <Button onClick={handleCreate}>
          Clique aqui para criar uma
        </Button>
        <div className='w-full flex flex-col justify-center items-center gap-2 mt-4'>
          <Label>Ou cole um convite aqui</Label>
          <div className='flex items-center gap-1'>
            <Input placeholder="AJNS-SEF-23AS" />
            <Button>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={openRoomsTableDialog} onOpenChange={rooms.length > 0 ? setOpenRoomsTableDialog : () => { }}>
      <DialogContent className={cn(rooms.length > 0 && 'max-w-[90dvw] w-[1024px]')}>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <GraduationCapIcon /> Suas turmas
            </div>
            {
              rooms.length > 0 && (
                <Button variant='secondary' size='icon' onClick={handleCreate}>
                  <PlusIcon className='size-4' />
                </Button>
              )
            }
          </DialogTitle>
        </DialogHeader>
        <div>
          {
            rooms.length === 0 ? <EmptyRooms /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    rooms.map(complexRoom => (
                      <TableRow key={complexRoom.room.id}>
                        <TableCell>
                          <Button variant='ghost'>
                            {complexRoom.room.id}
                          </Button>
                        </TableCell>
                        <TableCell className='flex items-center gap-2'>
                          <Button variant='ghost'>
                            <Icon name={complexRoom.room.iconName} />
                            {complexRoom.room.name}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant='outline' onClick={() => handleRoomSelect(complexRoom)}>Acessar</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}
