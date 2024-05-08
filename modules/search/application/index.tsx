'use client'

import { useEffect } from "react"
import { useSearchAll } from "./store/search-all"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { CalendarDaysIcon, CalendarIcon, ComputerIcon, GraduationCapIcon, KanbanIcon, LayoutDashboardIcon, MoonStarIcon, StoreIcon, SunIcon, UserIcon, UsersIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRoom } from "@/modules/room/application/store/room"

export function SearchAll() {

  const { open, setOpen } = useSearchAll()
  const { theme, setTheme } = useTheme()
  const { setOpenRoomsTableDialog: setOpenRoomDialog } = useRoom()

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey || e.altKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handleEvent)
    return () => document.removeEventListener('keydown', handleEvent)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Pesquise qualquer coisa..." />
      <CommandList>
        <ScrollArea className='h-[300px]'>
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
          <CommandGroup heading="Sugestões">
            <CommandItem onSelect={() => {
              setOpen(false)
              setOpenRoomDialog(true)
            }}>
              <GraduationCapIcon className="mr-2 size-6" />
              <span>Suas turmas</span>
            </CommandItem>
            <CommandItem>
              <LayoutDashboardIcon className="mr-2 size-6" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem>
              <KanbanIcon className="mr-2 size-6" />
              <span>Kanban</span>
            </CommandItem>
            <CommandItem>
              <CalendarDaysIcon className="mr-2 size-6" />
              <span>Calendário</span>
            </CommandItem>
            <CommandItem>
              <StoreIcon className="mr-2 size-6" />
              <span>Itens</span>
            </CommandItem>
            <CommandItem>
              <UserIcon className="mr-2 size-6" />
              <span>Perfil</span>
            </CommandItem>
            <CommandItem onSelect={toggleTheme}>
              {theme === 'light' ? <SunIcon className='mr-2 size-6' /> : <MoonStarIcon className='mr-2 size-6' />}
              <span>Trocar tema</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )

}