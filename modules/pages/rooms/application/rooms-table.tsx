'use client'

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRoom } from "@/modules/room/application/store/room";
import { ComplexRoom } from "@/modules/room/domain/types";
import { BetweenVerticalStart, CircleCheck, CircleX, MoreVertical } from "lucide-react";
import moment from 'moment';
import { ReactNode, useState } from "react";

type Column = {
  id: string,
  label: string,
  content: (e: ComplexRoom) => ReactNode,
  toRight?: boolean,
  isActive: boolean,
}

const COLUMNS: Column[] = [
  {
    id: 'id',
    label: 'Código',
    content: (e: ComplexRoom) => e.room.id,
    isActive: false
  },
  {
    id: 'name',
    label: 'Nome',
    content: (e: ComplexRoom) => (
      <div className='flex items-center gap-2'>
        <Icon name={e.room.iconName} size={20} />
        {e.room.name}
      </div>
    ),
    isActive: true
  },
  {
    id: 'members',
    label: 'Integrantes',
    content: (e: ComplexRoom) => e.room.profilesRoom.length,
    toRight: true,
    isActive: true
  },
  {
    id: 'created_at',
    label: 'Criada em',
    content: (e: ComplexRoom) => moment(e.room.createdAt).format('DD/MM/YYYY HH:mm'),
    toRight: true,
    isActive: false
  },
  {
    id: 'updated_at',
    label: 'Atualizada em',
    content: (e: ComplexRoom) => moment(e.room.updatedAt).format('DD/MM/YYYY HH:mm'),
    toRight: true,
    isActive: false
  },
  {
    id: 'actions',
    label: 'Ações',
    content: () => (
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
    ),
    isActive: true
  }
]

export const OnlyClientRoomsTable = () => {

  const { rooms } = useRoom()
  const [search, setSearch] = useState<string>('')
  const [columns, setColumns] = useState(COLUMNS)

  const filteredRooms = rooms.filter(room => room.room.name.toLowerCase().includes(search.toLowerCase()))
  const activeColumns = columns.filter(column => column.isActive)

  const toggleColumn = (columnId: string) => {
    const newColumns = [...columns]
    for (let columnIndex = 0; columnIndex < newColumns.length; columnIndex++) {
      const columnObject = newColumns[columnIndex]
      if (columnObject.id === columnId) {
        columnObject.isActive = !columnObject.isActive
      }
    }
    setColumns(newColumns)
  }

  return (
    <>
      <div className='flex items-center gap-4 justify-between'>
        <div>
          <Input
            placeholder="Pesquisar turmas"
            value={search}
            onValueChange={setSearch}
          />
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <Button size='sm' variant='secondary' className='w-32'>
                <BetweenVerticalStart className='size-4' />
                Colunas
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0 w-[160px]'>
              <Command>
                <CommandInput
                  placeholder="Colunas"
                />
                <CommandEmpty>Não encontrada</CommandEmpty>
                <CommandList>
                  <CommandGroup title="Colunas">
                    {
                      columns.map(column => (
                        <CommandItem disableCircle key={column.id} value={column.label} className='flex items-center gap-2'>
                          <Checkbox checked={column.isActive} onClick={() => toggleColumn(column.id)} />
                          <Label>
                            {column.label}
                          </Label>
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Table className='mt-2'>
        <TableCaption>Lista de turmas</TableCaption>
        <div className='w-full flex'>
          <ScrollArea orientation='horizontal' className='w-1 flex-1'>
            <TableHeader>
              <TableRow>
                {
                  activeColumns.map(column => (
                    <TableHead key={column.id} className={cn(column.toRight && 'text-right')}>
                      {column.label}
                    </TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map(room => (
                <TableRow key={room.room.id} className={cn(room.profileRoom.role === 'OWNER' && 'border-l-2 border-l-primary')}>
                  {
                    activeColumns.map(column => (
                      <TableCell key={room.room.id + '-' + column.id} className={cn(column.toRight && 'text-right')}>
                        {
                          column.content(room)
                        }
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </ScrollArea>
        </div>
      </Table>
    </>
  )
}