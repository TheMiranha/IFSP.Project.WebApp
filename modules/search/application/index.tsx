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
import { CalendarDaysIcon, GraduationCapIcon, KanbanIcon, LayoutDashboardIcon, LogOut, MoonStarIcon, StoreIcon, SunIcon, UserIcon, UsersIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRoom } from "@/modules/room/application/store/room"
import { useAuth } from "@/modules/auth/application/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useLoading } from "@/modules/loading/application/store/loading"

export function SearchAll() {

  const { open, setOpen } = useSearchAll()
  const { theme, setTheme } = useTheme()
  const { setOpenRoomsTableDialog: setOpenRoomDialog } = useRoom()
  const { signOut } = useAuth()
  const router = useRouter()
  const { setActive } = useLoading()

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
    setOpen(false)
  }

  const handleSignOut = () => {
    setOpen(false)
    setActive(true)
    signOut()
  }

  const handleRedirect = (url: string) => {
    setOpen(false)
    router.push(url)
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
            <CommandItem onSelect={() => handleRedirect('/teams')}>
              <UsersIcon className="mr-2 size-6" />
              <span>Equipes</span>
            </CommandItem>
            <CommandItem onSelect={() => handleRedirect('/dashboard')}>
              <LayoutDashboardIcon className="mr-2 size-6" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => handleRedirect('/kanban')}>
              <KanbanIcon className="mr-2 size-6" />
              <span>Kanban</span>
            </CommandItem>
            <CommandItem onSelect={() => handleRedirect('/calendar')}>
              <CalendarDaysIcon className="mr-2 size-6" />
              <span>Calendário</span>
            </CommandItem>
            <CommandItem onSelect={() => handleRedirect('/store')}>
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
            <CommandItem onSelect={() => handleSignOut()}>
              <LogOut className='mr-2 size-6' />
              <span>Sair</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )

}