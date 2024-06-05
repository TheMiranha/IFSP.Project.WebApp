'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Backpack, BookmarkCheck, Contact, GraduationCap, Kanban, LayoutList, Settings, Store, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export function SidebarMidSection({ height }: { height: number }) {

  const router = useRouter()

  const handleRedirect = (url: string) => {
    router.push(url)
  }

  return (
    <ScrollArea className='flex flex-col w-full px-4' style={{ height: `${height}px` }}>
      <div className='flex flex-col gap-4 py-4'>
        <div className='space-y-2'>
          <Label className='text-muted-foreground'>Geral</Label>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/dashboard')} variant='ghost' className='w-full justify-start'>
              <DashboardIcon className='size-4' />
              Dashboard
            </Button>
            <Button onClick={() => handleRedirect('/rooms')} variant='ghost' className='w-full justify-start'>
              <GraduationCap className='size-4' />
              Turmas
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          <Label className='text-muted-foreground'>Turma</Label>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/teams')} variant='ghost' className='w-full justify-start'>
              <Users className='size-4' />
              Equipes
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/room-members')} variant='ghost' className='w-full justify-start'>
              <Contact className='size-4' />
              Membros
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/settings')} variant='ghost' className='w-full justify-start'>
              <Settings className='size-4' />
              Ajustes
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          <Label className='text-muted-foreground'>Equipe</Label>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/kanban')} variant='ghost' className='w-full justify-start'>
              <Kanban className='size-4' />
              Board
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/tasks')} variant='ghost' className='w-full justify-start'>
              <LayoutList className='size-4' />
              Tarefas
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/team-members')} variant='ghost' className='w-full justify-start'>
              <Users className='size-4' />
              Integrantes
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          <Label className='text-muted-foreground'>Você</Label>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/inventory')} variant='ghost' className='w-full justify-start'>
              <Backpack className='size-4' />
              Inventário
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/store')} variant='ghost' className='w-full justify-start'>
              <Store className='size-4' />
              Loja
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button onClick={() => handleRedirect('/my-tasks')} variant='ghost' className='w-full justify-start'>
              <BookmarkCheck className='size-4' />
              Suas tarefas
            </Button>
          </div>
        </div>
      </div>
    </ ScrollArea>
  )
}