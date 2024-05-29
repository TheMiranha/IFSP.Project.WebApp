'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRoom } from "./store/room"
import { ChevronsUpDown, GraduationCapIcon, PlusIcon } from "lucide-react"
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
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createRoom } from "../domain/room.actions"
import { CreateRoom } from "../domain/room.outputs"
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

  const { rooms, openCreateRoomDialog, setRooms, setOpenCreateRoomDialog, setCurrentRoom } = useRoom()
  const [openIconPopover, setOpenIconPopover] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      iconName: ''
    }
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setActive(true)
    setOpenCreateRoomDialog(false)
    const payload = values as CreateRoom['props']
    const response = await createRoom(payload)
    if (response.success) {

      const complexRoom = { room: response.room.room, profileRoom: response.room.profileRoom }

      setCurrentRoom(complexRoom)

      setRooms([...rooms, complexRoom])

      form.reset()

      setActive(false)
      setOpenCreateRoomDialog(false)
    } else {
      toast({
        title: 'Ocorreu um erro!',
        variant: 'destructive'
      })
      setActive(false)
    }
  }

  return (
    <>
      <Dialog open={openCreateRoomDialog} onOpenChange={active ? () => { } : setOpenCreateRoomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <GraduationCapIcon /> Criar turma
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
                    <PlusIcon />
                    Criar
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