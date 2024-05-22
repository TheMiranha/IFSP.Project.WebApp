'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { useContainer } from "./store/container";

export function ScrollableHeight({ children }: { children: ReactNode }) {

  const { height } = useContainer()

  return (
    <ScrollArea className='flex-1 p-2' style={{ height: `${height}px` }}>
      {children}
    </ScrollArea>
  )
}