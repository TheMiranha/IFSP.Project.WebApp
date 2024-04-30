import { ReactNode } from "react";
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from "../domain/ptBR";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      {children}
    </ClerkProvider>
  )
}