'use client'

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRoom } from "@/modules/room/application/store/room";
import { MoreVertical } from "lucide-react";
import moment from 'moment'

export function RoomsPage() {

  const { rooms } = useRoom()

  return (
    <PageContainer title='Turmas'>
      <Table>
        <TableCaption>Lista de turmas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className='text-right'>Integrantes</TableHead>
            <TableHead className='text-right'>Criada em</TableHead>
            <TableHead className='text-right'>Atualizada em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map(room => (
            <TableRow key={room.room.id} className={cn(room.profileRoom.role === 'OWNER' && 'border-l-2 border-l-primary')}>
              <TableCell>{room.room.id}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Icon name={room.room.iconName} size={20} />
                  {room.room.name}
                </div>
              </TableCell>
              <TableCell className='text-right'>{room.room.profilesRoom.length}</TableCell>
              <TableCell className='text-right'>{moment(room.room.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell className='text-right'>{moment(room.room.updatedAt).format('DD/MM/YYYY HH:mm')}</TableCell>
              <TableCell>
                <Button variant='ghost' size='sm'>
                  <MoreVertical className='size-6 text-muted-foreground' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageContainer>
  )
}