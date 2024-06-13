'use client'

import { ComplexTable } from "@/modules/complex-table/application";
import { WithComplexTableRow } from "@/modules/complex-table/domain/types";
import { useRoom } from "@/modules/room/application/store/room";
import { ComplexRoom } from "@/modules/room/domain/types";
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
    visible: true
  },
  {
    id: 'updated_at',
    label: 'Atualizada em',
    render: (e: WithComplexTableRow<ComplexRoom>) => moment(e.room.updatedAt).format('DD/MM/YYYY HH:mm'),
    alignment: 'right',
    visible: true
  }
] as const

export const OnlyClientRoomsTable = () => {

  const { rooms } = useRoom()

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

  return (
    <>
      <ComplexTable data={formattedRooms} columns={COLUMNS} searchableColumns={['id', 'name']} caption="Lista de turmas" />
    </>
  )
}