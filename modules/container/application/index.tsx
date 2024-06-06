'use client'

import { useEffect, useRef, useState } from "react"
import { useContainer } from "./store/container"
import { useResizeObserver } from "usehooks-ts"

export function ContainerHeight() {

  const { setHeight, setContentHeight } = useContainer()
  const containerRef = useRef<null | HTMLDivElement>(null)
  const { height = 0 } = useResizeObserver({
    ref: containerRef,
    box: 'border-box'
  })

  useEffect(() => {
    setHeight(height)
    setContentHeight(height - 16)
  }, [height])

  return (
    <div ref={containerRef} />
  )
}