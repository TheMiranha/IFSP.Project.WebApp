'use client'

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRoom } from "@/modules/room/application/store/room";
import { MoreVertical } from "lucide-react";
import moment from 'moment';

export const OnlyClientRoomsTable = () => {

  const { rooms } = useRoom()

  return (
    <Table>
      <TableCaption>Lista de turmas</TableCaption>
      <div className='w-full flex'>
        <ScrollArea orientation='horizontal' className='w-1 flex-1'>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <MoreVertical className='size-6 text-muted-foreground' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Participantes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </div>
    </Table>
  )
}