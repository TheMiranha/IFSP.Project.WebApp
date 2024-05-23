import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
  return (
    <div className='h-[100dvh] w-[100dvw] flex flex-col items-center justify-center gap-2'>
      <Label>Página de apresentação do projeto</Label>
      <Link href='/sign-in'>
        <Button>Acessar tela de autenticação</Button>
      </Link>
    </div>
  )
}