import Icon, { Icons } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarDaysIcon, KanbanIcon, LayoutDashboardIcon, RabbitIcon, StoreIcon, UserIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <div className='h-[100dvh] flex flex-col items-center gap-2 border-r'>
      <SidebarIcon />
      <SidebarItems />
    </div>
  )
}

const SidebarIcon = () => {
  return (
    <div className='border-b w-full h-12 px-4 grid place-items-center'>
      <RabbitIcon className='size-6' />
    </div>
  )
}

const SidebarItems = () => {
  return (
    <div className='p-4 flex flex-col flex-1'>
      <TooltipProvider>
        <div className='flex-1 flex flex-col gap-2'>
          <SidebarItem href={'/dashboard'} icon={'LayoutDashboard'} tooltipContent="Dashboard" />
          <SidebarItem href={'/kanban'} icon={'Kanban'} tooltipContent="Kanban" />
          <SidebarItem href={'/calendar'} icon={'CalendarDays'} tooltipContent="Calendário" />
          <SidebarItem href={'/store'} icon={'Store'} tooltipContent="Loja" />
          <SidebarItem href={'/teams'} icon={'Users'} tooltipContent="Equipes" />
        </div>
        <div className='flex flex-col gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon'>
                <UserIcon className='size-6' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>Usuário</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}

const SidebarItem = ({ href, icon, tooltipContent }: { href: string, icon: Icons, tooltipContent: string }) => {
  return (
    <Link href={href}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Icon name={icon} size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>{tooltipContent}</TooltipContent>
      </Tooltip>
    </Link>
  )
}
