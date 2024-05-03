import { ContainerHeight } from "@/modules/container/application";
import { ScrollableHeight } from "@/modules/container/application/scrollable-height";
import { Sidebar } from "@/modules/navigation/application/sidebar";
import { Topbar } from "@/modules/navigation/application/topbar";
import { RoomDialog } from "@/modules/room/application";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='h-[100dvh] w-[100dvw] flex items-start'>
      <Sidebar />
      <RoomDialog />
      <div className='flex-1 flex flex-col h-[100dvh]'>
        <Topbar />
        <div className='flex-1 flex'>
          <ContainerHeight />
          <ScrollableHeight>
            {children}
          </ScrollableHeight>
        </div>
      </div>
    </div>
  )
}