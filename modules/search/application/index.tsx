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
import { Backpack, BookmarkCheck, CalendarDaysIcon, Contact, GraduationCapIcon, Kanban, KanbanIcon, Layout, LayoutDashboardIcon, LayoutList, LogOut, LogOutIcon, MoonStarIcon, Settings, Store, StoreIcon, SunIcon, UserIcon, Users, UsersIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRoom } from "@/modules/room/application/store/room"
import { useAuth } from "@/modules/auth/application/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useLoading } from "@/modules/loading/application/store/loading"
import { DashboardIcon } from "@radix-ui/react-icons"

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
          <CommandGroup heading='Geral'>
            <CommandItem onSelect={() => {
              handleRedirect('/dashboard')
            }}>
              <DashboardIcon className="mr-2 size-6" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/rooms')
            }}>
              <GraduationCapIcon className="mr-2 size-6" />
              <span>Turmas</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Turma'>
            <CommandItem onSelect={() => {
              handleRedirect('/teams')
            }}>
              <Users className="mr-2 size-6" />
              <span>Equipes</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/room-members')
            }}>
              <Contact className="mr-2 size-6" />
              <span>Membros</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/room-settings')
            }}>
              <Settings className="mr-2 size-6" />
              <span>Ajustes</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Equipe'>
            <CommandItem onSelect={() => {
              handleRedirect('/board')
            }}>
              <Kanban className="mr-2 size-6" />
              <span>Board</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/tasks')
            }}>
              <LayoutList className="mr-2 size-6" />
              <span>Tarefas</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/team-members')
            }}>
              <Users className="mr-2 size-6" />
              <span>Integrantes</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Você'>
            <CommandItem onSelect={() => {
              handleRedirect('/inventory')
            }}>
              <Backpack className="mr-2 size-6" />
              <span>Inventário</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/store')
            }}>
              <Store className="mr-2 size-6" />
              <span>Loja</span>
            </CommandItem>
            <CommandItem onSelect={() => {
              handleRedirect('/my-tasks')
            }}>
              <BookmarkCheck className="mr-2 size-6" />
              <span>Suas tarefas</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Conta'>
            <CommandItem onSelect={() => {
              handleSignOut()
            }}>
              <LogOutIcon className="mr-2 size-6" />
              <span>Sair</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Outros'>
            <CommandItem onSelect={() => {
              toggleTheme()
            }}>
              <Layout className="mr-2 size-6" />
              <span>Tema</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )

}