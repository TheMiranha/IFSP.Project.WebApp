'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRoom } from "./store/room"
import { ArrowRightIcon, GraduationCapIcon, MoreVertical, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Icon from "@/components/icon"
import { ComplexRoom } from "../domain/types"
import { cn } from "@/lib/utils"
import { useLoading } from "@/modules/loading/application/store/loading"
import { CopyToClipboardContainer } from "@/lib/hooks/useCopyToClipboard"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { enterRoom } from "../domain/room.actions"
import { toast } from "@/components/ui/use-toast"

export const RoomsTableDialog = () => {

  const { setRooms, setOpenEnterRoomDialog, setCurrentRoom, openRoomsTableDialog, setOpenRoomsTableDialog, rooms, setOpenCreateRoomDialog } = useRoom()
  const { active } = useLoading()
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleEnterRoom = async () => {
    if (loading) return
    if (code.length < 19) {
      return toast({ title: 'Ops...', description: 'Código de turma incorreto!', variant: 'destructive' })
    }
    setLoading(true)
    const response = await enterRoom({ shareCode: code })
    if (!response.success || !response.room) {
      return toast({ title: 'Ops...', description: response.errorMessage, variant: 'destructive' })
    }
    setOpenEnterRoomDialog(false)
    setRooms([...rooms, response.room])
    setCurrentRoom(response.room)
    setLoading(false)
    return toast({ title: 'Você entrou na turma!', description: `Turma: "${response.room.room.name}"` })
  }

  const handleCreate = () => {
    setOpenRoomsTableDialog(false)
    setOpenCreateRoomDialog(true)
  }

  const handleRoomSelect = (complexRoom: ComplexRoom) => {
    setOpenRoomsTableDialog(false)
    setCurrentRoom(complexRoom)
  }

  const handleRedirect = ({ complexRoom, href }: { complexRoom: ComplexRoom, href: string }) => {
    setOpenRoomsTableDialog(false)
    setCurrentRoom(complexRoom)
    router.push(href)
  }

  const handleEnterRoomDialog = () => {
    setOpenRoomsTableDialog(false)
    setOpenEnterRoomDialog(true)
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
            <Input placeholder="515J-3ECN-SZ3V-Q82E" value={code} onChange={e => setCode(e.target.value)} />
            <Button onClick={handleEnterRoom}>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={openRoomsTableDialog && !active} onOpenChange={rooms.length > 0 ? setOpenRoomsTableDialog : () => { }}>
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
          {
            rooms.length > 0 && (
              <DialogDescription>
                <Label className='cursor-pointer' onClick={handleEnterRoomDialog}>
                  Tem um código de turma?
                </Label>
              </DialogDescription>
            )
          }
        </DialogHeader>
        <div>
          {
            rooms.length === 0 ? <EmptyRooms /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    {/* <TableHead>Ações</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    rooms.map(complexRoom => (
                      <TableRow key={complexRoom.room.id}>
                        <TableCell className='flex items-center gap-2'>
                          <CopyToClipboardContainer content={complexRoom.room.name} title='Nome de sala copiado!'>
                            <Button variant='ghost'>
                              <Icon name={complexRoom.room.iconName} />
                              {complexRoom.room.name}
                            </Button>
                          </CopyToClipboardContainer>
                        </TableCell>
                        <TableCell>
                          <Button variant='outline' onClick={() => handleRoomSelect(complexRoom)}>
                            Acessar
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant='outline' onClick={() => handleRedirect({ href: '/room-members', complexRoom })}>
                            Membros
                          </Button>
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
