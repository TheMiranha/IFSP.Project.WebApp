'use client'

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(({ children, title, subtitle }, ref) => {

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && (
          <CardDescription>{subtitle}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
})

PageContainer.displayName = 'PageContainer'

export {
  PageContainer
}