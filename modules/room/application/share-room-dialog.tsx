'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRoom } from "./store/room";
import { ClipboardIcon, HandHelpingIcon, RefreshCw, Share2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { toast } from "@/components/ui/use-toast";
import { regenerateRoomShareCode } from "../domain/room.actions";
import { useState } from "react";

export function ShareRoomDialog() {

  const { setCurrentRoom, currentRoom, openShareRoomDialog, setOpenShareRoomDialog } = useRoom()
  const { copy } = useCopyToClipboard()
  const [loading, setLoading] = useState<boolean>(false)

  const handleCopy = async () => {
    if (loading) return
    if (!currentRoom) return
    const success = await copy(currentRoom.room.shareCode)
    if (success) {
      toast({
        title: 'Código copiado com sucesso!'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao copiar código.'
      })
    }
  }

  const handleRegenerate = async () => {
    if (loading) return
    if (!currentRoom) return
    setLoading(true)
    const response = await regenerateRoomShareCode({ roomId: currentRoom.room.id })
    if (response.success && response.shareCode) {
      toast({ title: 'Novo código gerado!' })
      setCurrentRoom({
        ...currentRoom, room: {
          ...currentRoom.room,
          shareCode: response.shareCode
        }
      })
    } else {
      toast({ title: 'Ops...', description: response.errorMessage || 'Ocorreu um erro.' })
    }
    setLoading(false)
  }

  return (
    <Dialog open={openShareRoomDialog} onOpenChange={setOpenShareRoomDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <Share2Icon /> Compartilhar
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center gap-2'>
          <Button disabled={loading} variant='outline' onClick={handleCopy}>
            {currentRoom?.room.shareCode || 'Código ainda não gerado'}
          </Button>
          <Button disabled={loading} variant='ghost' size='sm' onClick={handleRegenerate}>
            Gerar outro código
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}