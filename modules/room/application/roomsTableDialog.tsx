'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRoom } from "./store/room"
import { ArrowRightIcon, GraduationCapIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const RoomsTableDialog = () => {

  const { openRoomsTableDialog, setOpenRoomsTableDialog, rooms, setOpenCreateRoomDialog } = useRoom()

  const handleCreate = () => {
    setOpenRoomsTableDialog(false)
    setOpenCreateRoomDialog(true)
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
    <Dialog open={openRoomsTableDialog} onOpenChange={setOpenRoomsTableDialog}>
      <DialogContent>
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
                </TableBody>
              </Table>
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}