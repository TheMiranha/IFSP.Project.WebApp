'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRoom } from "./store/room"
import { ChevronsUpDown, GraduationCapIcon, Pencil, Plus, PlusIcon } from "lucide-react"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { icons } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import Icon, { Icons } from "@/components/icon"
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createRoom, editRoom } from "../domain/room.actions"
import { CreateRoom, EditRoom } from "../domain/room.outputs"
import { toast } from "@/components/ui/use-toast"
import { useLoading } from "@/modules/loading/application/store/loading"

const formSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(100),
  iconName: z.string()
})

const iconsList = Object.keys(icons) as Icons[]

export const CreateRoomDialog = () => {

  const { active, setActive } = useLoading()

  const { rooms, currentRoom, openCreateRoomDialog, setRooms, setOpenCreateRoomDialog, setCurrentRoom, currentEditRoom, setCurrentEditRoom } = useRoom()
  const [openIconPopover, setOpenIconPopover] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      iconName: ''
    }
  })

  useEffect(() => {
    if (currentEditRoom) {
      form.setValue('name', currentEditRoom.room.name)
      form.setValue('description', currentEditRoom.room.description)
      form.setValue('iconName', currentEditRoom.room.iconName)
    } else {
      form.setValue('name', "")
      form.setValue('description', "")
      form.setValue('iconName', "")
    }
  }, [currentEditRoom])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setActive(true)

    if (currentEditRoom && currentEditRoom?.room?.id) {
      const payload = { ...values, roomId: currentEditRoom.room.id } as EditRoom['props']
      edit(payload)
    } else {
      const payload = values as CreateRoom['props']
      create(payload)
    }

  }

  const edit = async (payload: EditRoom['props']) => {
    setOpenCreateRoomDialog(false)
    const response = await editRoom(payload)
    if (response.success) {
      if (currentRoom && currentEditRoom && currentRoom?.room.id === currentEditRoom?.room.id) {
        setCurrentRoom({
          ...currentRoom,
          room: {
            ...currentRoom.room,
            name: payload.name,
            description: payload.description,
            iconName: payload.iconName
          }
        })
      }

      const newRooms = [...rooms]
      newRooms.forEach(room => {
        if (room.room.id === currentEditRoom?.room.id) {
          room.room.name = payload.name
          room.room.description = payload.description
          room.room.iconName = payload.iconName
        }
      })
      setRooms(rooms)
      setCurrentEditRoom(null)
    } else {
      toast({ title: 'Ops...', description: response.errorMessage || 'Ocorreu um erro.', variant: 'destructive' })
    }
    setActive(false)
  }

  const create = async (payload: CreateRoom['props']) => {
    const response = await createRoom(payload)
    if (response.success) {

      const complexRoom = { room: response.room.room, profileRoom: response.room.profileRoom }

      setCurrentRoom(complexRoom)

      setRooms([...rooms, complexRoom])

      form.reset()
      setOpenCreateRoomDialog(false)
    } else {
      toast({
        title: 'Ocorreu um erro!',
        variant: 'destructive'
      })
    }
    setActive(false)
  }

  return (
    <>
      <Dialog open={openCreateRoomDialog} onOpenChange={active ? () => { } : setOpenCreateRoomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <GraduationCapIcon /> {currentEditRoom ? 'Editar' : 'Criar'} turma
            </DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                <div className='w-full flex flex-col items-center gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nome da sala'
                            className='w-[300px]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Descrição da sala'
                            className='w-[300px]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="iconName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ícone</FormLabel>
                        <Popover open={openIconPopover} onOpenChange={setOpenIconPopover}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between w-[300px]",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? <>
                                    <Icon name={iconsList.find(iconName => iconName === field.value) || iconsList[0]} size={20} />
                                    {iconsList.find(iconName => iconName === field.value)}
                                  </>
                                  : 'Selecione um ícone'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Pesquisar ícone..." />
                              <ScrollArea className='h-[200px]'>
                                <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
                                <CommandGroup>
                                  {
                                    iconsList.map((iconName) => (
                                      <CommandItem
                                        value={iconName}
                                        key={iconName}
                                        onSelect={() => {
                                          setOpenIconPopover(false)
                                          form.setValue("iconName", iconName)
                                        }}
                                      >
                                        <div className='flex items-center justify-between w-full'>
                                          {iconName}
                                          <Icon name={iconName} size={20} />
                                        </div>
                                      </CommandItem>
                                    ))
                                  }
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-full flex justify-end'>
                  <Button type='submit'>
                    {
                      currentEditRoom ? <Pencil className='size-4' /> : <Plus className='size-4' />
                    }
                    {
                      currentEditRoom ? 'Salvar' : 'Criar'
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>

  )
}