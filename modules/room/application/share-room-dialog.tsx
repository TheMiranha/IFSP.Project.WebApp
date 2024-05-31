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
import { disableShareCodeRoom, regenerateRoomShareCode } from "../domain/room.actions";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export function ShareRoomDialog() {

  const { setCurrentRoom, currentRoom, openShareRoomDialog, setOpenShareRoomDialog } = useRoom()
  const [disableShareCode, setDisableShareCode] = useState<boolean>(false)
  const { copy } = useCopyToClipboard()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (currentRoom)
      setDisableShareCode(currentRoom?.room.disableShareCode)
  }, [currentRoom])

  const handleCopy = async () => {
    if (loading || disableShareCode) return
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

  const handleShareStatus = async () => {
    if (!currentRoom || loading) return
    setLoading(true)
    const response = await disableShareCodeRoom({
      disableShareCode,
      roomId: currentRoom.room.id
    })

    if (response.success) {
      toast({ title: 'Sucesso!', description: 'O compartilhamento foi ' + ((!disableShareCode) ? 'desativado' : 'ativado') + '.' })
    } else {
      toast({ title: 'Ops...', description: response.errorMessage || 'Ocorreu um erro.' })
    }
    setDisableShareCode(!disableShareCode)
    setCurrentRoom({
      ...currentRoom, room: {
        ...currentRoom.room,
        disableShareCode: !disableShareCode
      }
    })
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
          <Button disabled={loading || disableShareCode} variant='outline' onClick={handleCopy}>
            {currentRoom?.room.shareCode || 'Código ainda não gerado'}
          </Button>
          <Button disabled={loading} variant='ghost' size='sm' onClick={handleRegenerate}>
            Gerar outro código
          </Button>
          <div className="flex items-center space-x-2">
            <Switch id="disble-share-code" disabled={loading} onClick={handleShareStatus} checked={disableShareCode} />
            <Label htmlFor="disble-share-code">Desabilitar compartilhamento</Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}