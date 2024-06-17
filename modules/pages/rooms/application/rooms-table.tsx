'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { ComplexTable } from "@/modules/complex-table/application";
import { WithComplexTableRow } from "@/modules/complex-table/domain/types";
import { useLoading } from "@/modules/loading/application/store/loading";
import { useRoom } from "@/modules/room/application/store/room";
import { deleteRoom, quitRoom } from "@/modules/room/domain/room.actions";
import { ComplexRoom } from "@/modules/room/domain/types";
import { MoreVertical, PlusIcon } from "lucide-react";
import moment from 'moment';
import { useMemo } from "react";

const COLUMNS = [
  {
    id: 'id',
    label: 'Código',
    render: (e: WithComplexTableRow<ComplexRoom>) => e.room.id,
    visible: true
  },
  {
    id: 'name',
    label: 'Nome',
    render: (e: WithComplexTableRow<ComplexRoom>) => e.room.name,
    visible: true
  },
  {
    id: 'members',
    label: 'Integrantes',
    render: (e: WithComplexTableRow<ComplexRoom>) => e.room.profilesRoom.length,
    alignment: 'right',
    visible: true
  },
  {
    id: 'created_at',
    label: 'Criada em',
    render: (e: WithComplexTableRow<ComplexRoom>) => moment(e.room.createdAt).format('DD/MM/YYYY HH:mm'),
    alignment: 'right',
    visible: false
  },
  {
    id: 'updated_at',
    label: 'Atualizada em',
    render: (e: WithComplexTableRow<ComplexRoom>) => moment(e.room.updatedAt).format('DD/MM/YYYY HH:mm'),
    alignment: 'right',
    visible: false
  },
  {
    id: 'actions',
    label: '',
    render: (e: WithComplexTableRow<ComplexRoom>) => <OnlyClientRoomsTableActions room={e} />,
    visible: true,
    alignment: 'center'
  }
] as const

export const OnlyClientRoomsTable = () => {

  const { rooms, setOpenCreateRoomDialog } = useRoom()

  const formattedRooms = useMemo<WithComplexTableRow<ComplexRoom>[]>(() => {
    return rooms.map(room => {
      return {
        ...room,
        table: {
          rowStatus: room.profileRoom.role === 'OWNER' ? 'primary' : 'default'
        }
      }
    })
  }, [rooms])

  const createAction = () => {
    setOpenCreateRoomDialog(true)
  }

  return (
    <ComplexTable data={formattedRooms} columns={COLUMNS} searchableColumns={['id', 'name']} caption="Lista de turmas" headerActions={[{ id: 'create-room', label: 'Criar turma', fn: createAction, icon: <PlusIcon className='size-4' /> }]} />
  )
}

const OnlyClientRoomsTableActions = ({ room }: { room: WithComplexTableRow<ComplexRoom> }) => {

  const { setActive } = useLoading()
  const { setRooms, rooms, setCurrentRoom, currentRoom, setCurrentEditRoom, setOpenCreateRoomDialog } = useRoom()

  const handleDeleteOrQuit = async () => {
    if (room.profileRoom.role === 'OWNER') {
      // DELETE ROOM LOGIC
      setActive(true)
      const response = await deleteRoom({ roomId: room.room.id })
      if (response.success) {
        toast({ title: 'Sucesso', description: 'Turma deletada.' })
        if (currentRoom?.room?.id === room.room.id) {
          setCurrentRoom(null)
        }
        setRooms(rooms.filter(filtered => filtered.room.id != room.room.id))
      } else {
        toast({ title: 'Ops...', description: response.errorMessage || 'Ocorreu um erro.', variant: 'destructive' })
      }
      setActive(false)
      return
    }
    setActive(true)
    const response = await quitRoom({ roomId: room.room.id })
    if (response.success) {
      toast({ title: 'Sucesso', description: 'Você saiu da sala.' })
      if (currentRoom?.room?.id === room.room.id) {
        setCurrentRoom(null)
      }
      setRooms(rooms.filter(filtered => filtered.room.id != room.room.id))
    } else {
      toast({ title: 'Ops...', description: response.errorMessage || 'Ocorreu um erro.', variant: 'destructive' })
    }
  }

  const handleEdit = () => {
    setCurrentEditRoom(room)
    setOpenCreateRoomDialog(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          room.profileRoom.role === 'OWNER' && (
            <DropdownMenuItem onSelect={handleEdit}>
              Editar
            </DropdownMenuItem>
          )
        }
        <DropdownMenuItem onSelect={handleDeleteOrQuit}>
          {
            room.profileRoom.role === 'OWNER' ? 'Exluir' : 'Sair'
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}