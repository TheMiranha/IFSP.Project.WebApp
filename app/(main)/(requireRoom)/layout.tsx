'use client'

import { NoRoomSelected } from "@/modules/room/application/no-room-selected";
import { useRoom } from "@/modules/room/application/store/room";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {

  const { currentRoom } = useRoom()

  if (currentRoom) {
    return children
  }
  return <NoRoomSelected />
}