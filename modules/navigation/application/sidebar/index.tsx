'use client'

import { SidebarTopSection } from "./sections/top"
import { SidebarMidSection } from "./sections/mid"
import { SidebarBottomSection } from "./sections/bottom"
import { useEffect, useRef, useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useNavigation } from "../store/navigation.store"

export function Sidebar() {

  const [localHeight, setLocalHeight] = useState(0)
  const containerRef = useRef<null | HTMLDivElement>(null)
  const { openSheet, setOpenSheet } = useNavigation()

  useEffect(() => {
    setLocalHeight(containerRef?.current?.clientHeight || 0)
  })

  return (
    <>
      <div className='h-[100dvh] flex-col items-center border-r hidden md:flex'>
        <SidebarTopSection />
        <div className='flex flex-1 w-full'>
          <div className='h-full' ref={containerRef} />
          <SidebarMidSection height={localHeight} />
        </div>
        <SidebarBottomSection />
      </div>
      <div className='block md:hidden'>
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent hideClose className='flex flex-col items-start p-0 px-1 w-fit' side={'left'}>
            <SidebarTopSection />
            <div className='flex flex-1 w-full'>
              <div className='h-full' ref={containerRef} />
              <SidebarMidSection height={localHeight} />
            </div>
            <SidebarBottomSection />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
