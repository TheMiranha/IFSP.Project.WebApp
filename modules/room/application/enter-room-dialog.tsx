'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRoom } from "./store/room";
import { Share2Icon, SwordsIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { enterRoom } from "../domain/room.actions";
import { describe } from "node:test";
import { toast } from "@/components/ui/use-toast";

export function EnterRoomDialog() {

  const { setRooms, rooms, setCurrentRoom, currentRoom, openEnterRoomDialog, setOpenEnterRoomDialog } = useRoom()
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleEnterRoom = async () => {
    if (loading) return
    if (code.length < 19) {
      return toast({ title: 'Ops...', description: 'Código de turma incorreto!', variant: 'destructive' })
    }
    setLoading(true)
    const response = await enterRoom({ shareCode: code })
    if (!response.success || !response.room) {
      return toast({ title: 'Ops...', description: response.errorMessage, variant: 'destructive' })
    }
    setOpenEnterRoomDialog(false)
    setRooms([...rooms, response.room])
    setCurrentRoom(response.room)
    setLoading(false)
    return toast({ title: 'Você entrou na turma!', description: `Turma: "${response.room.room.name}"` })
  }

  return (
    <Dialog open={openEnterRoomDialog} onOpenChange={setOpenEnterRoomDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <SwordsIcon /> Entrar em uma turma
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-2 items-center'>
          <Input disabled={loading} placeholder="Digite o código da turma" value={code} onChange={e => setCode(e.target.value)} />
          <Button onClick={handleEnterRoom} disabled={loading}>
            Acessar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}