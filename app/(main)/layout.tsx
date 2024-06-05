'use client'

import { ContainerHeight } from "@/modules/container/application";
import { ScrollableHeight } from "@/modules/container/application/scrollable-height";
import { LoadingModuleProvider } from "@/modules/loading/application/provider";
import { Sidebar } from "@/modules/navigation/application/sidebar";
import { Topbar } from "@/modules/navigation/application/topbar";
import { NoRoomSelected } from "@/modules/room/application/no-room-selected";
import { RoomModuleProvider } from "@/modules/room/application/provider";
import { useRoom } from "@/modules/room/application/store/room";
import { TeamModuleProvider } from "@/modules/team/application/provider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {

  const { currentRoom } = useRoom()

  return (
    <div className='h-[100dvh] w-[100dvw] flex items-start'>
      <LoadingModuleProvider />
      <Sidebar />
      <RoomModuleProvider />
      <TeamModuleProvider />
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