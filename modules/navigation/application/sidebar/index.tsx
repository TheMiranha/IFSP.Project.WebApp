'use client'

import { SidebarTopSection } from "./sections/top"
import { SidebarMidSection } from "./sections/mid"
import { SidebarBottomSection } from "./sections/bottom"
import { useEffect, useRef, useState } from "react"

export function Sidebar() {

  const [localHeight, setLocalHeight] = useState(0)
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    setLocalHeight(containerRef?.current?.clientHeight || 0)
  })

  return (
    <div className='h-[100dvh] flex flex-col items-center border-r'>
      <SidebarTopSection />
      <div className='flex flex-1 w-full'>
        <div className='h-full' ref={containerRef} />
        <SidebarMidSection height={localHeight} />
      </div>
      <SidebarBottomSection />
    </div>
  )
}
