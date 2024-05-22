'use client'

import { useEffect, useRef, useState } from "react"
import { useContainer } from "./store/container"

export function ContainerHeight() {

  const { setHeight } = useContainer()
  const [localHeight, setLocalHeight] = useState(0)
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    setLocalHeight(containerRef?.current?.clientHeight || 0)
  })

  useEffect(() => {
    setHeight(localHeight)
  }, [localHeight])

  return (
    <div ref={containerRef} />
  )
}