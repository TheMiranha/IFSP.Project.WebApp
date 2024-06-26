'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTeam } from "./store/team";
import { ChevronsUpDown, PlusIcon, UsersIcon } from "lucide-react";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import Icon, { Icons } from "@/components/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { icons } from "lucide-react"
import { useRoom } from "@/modules/room/application/store/room";
import { createTeam } from "../domain/team.actions";
import { getNameByAuthUser } from "@/modules/user/application/utils";

const formSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(3).max(100),
  iconName: z.string(),
  leaderId: z.string()
})
const iconsList = Object.keys(icons) as Icons[]

export function CreateTeamDialog() {

  const { openCreateTeamDialog, setOpenCreateTeamDialog, addTeam } = useTeam()
  const { currentRoom } = useRoom()
  const [openIconPopover, setOpenIconPopover] = useState<boolean>(false)
  const [openLeaderPopover, setOpenLeaderPopover] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      iconName: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!currentRoom?.room) {
      return toast({
        variant: 'destructive',
        title: 'Ops...',
        description: 'É necessário estar em uma turma para criar uma equipe.'
      })
    }

    setLoading(true)

    const response = await createTeam({
      ...data,
      roomId: currentRoom?.room.id
    })

    setLoading(false)

    if (!response.success) {
      return toast({
        variant: 'destructive',
        title: 'Ops...',
        description: response.errorMessage || 'Ocorreu um erro.'
      })
    }

    toast({
      title: 'Sucesso!',
      description: 'Equipe "' + data.name + '" foi criada.'
    })

    setOpenCreateTeamDialog(false)

    response.createdTeam && addTeam(response.createdTeam)
    form.reset()
  }

  useEffect(() => {
    if (!openCreateTeamDialog) {
      form.reset()
    }
  }, [openCreateTeamDialog, form])

  const selectedLeader = currentRoom?.room?.profilesRoom?.find(profileRoom => {
    return profileRoom.id === form.getValues('leaderId')
  })

  return (
    <Dialog open={openCreateTeamDialog} onOpenChange={setOpenCreateTeamDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <UsersIcon />
            Criar equipe
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
                          disabled={loading}
                          placeholder='Nome da equipe'
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
                          disabled={loading}
                          placeholder='Descrição da equipe'
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
                      <Popover open={loading ? false : openIconPopover} onOpenChange={!loading ? setOpenIconPopover : () => { }}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={loading}
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
                                        if (loading) return
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
                <FormField
                  control={form.control}
                  name="leaderId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Líder</FormLabel>
                      <Popover open={loading ? false : openLeaderPopover} onOpenChange={loading ? () => { } : setOpenLeaderPopover}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={loading}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between w-[300px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? <>
                                  {
                                    selectedLeader?.profile.authData && `${getNameByAuthUser(selectedLeader?.profile.authData)}`
                                  }
                                </>
                                : 'Selecione um líder'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Pesquisar membros..." />
                            <ScrollArea className='h-[200px]'>
                              <CommandEmpty>Nenhum membro encontrado.</CommandEmpty>
                              <CommandGroup>
                                {
                                  currentRoom?.room.profilesRoom.map(profileRoom => (
                                    <CommandItem
                                      value={profileRoom.id}
                                      key={profileRoom.id}
                                      onSelect={() => {
                                        setOpenLeaderPopover(false)
                                        form.setValue("leaderId", profileRoom.id)
                                      }}
                                    >
                                      {
                                        getNameByAuthUser(profileRoom.profile.authData)
                                      }
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
                <Button type='submit' disabled={loading}>
                  <PlusIcon />
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}