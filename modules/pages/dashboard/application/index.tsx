'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"

export function DashboardPage() {

  const { signOut } = useAuth()

  return (
    <div>
      <div>Dashboard</div>
      <Button onClick={() => signOut()}>
        sair da conta
      </Button>
    </div>
  )
}