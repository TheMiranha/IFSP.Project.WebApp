'use client'

import { toast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'
import { ReactNode, useCallback, useState } from 'react'

type CopiedValue = string | null

type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): { copiedText: CopiedValue, copy: CopyFn } {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }, [])

  return { copiedText, copy }
}

export function CopyToClipboardContainer({ children, content, title }: { children: ReactNode, content: string, title?: string }) {

  const { copy } = useCopyToClipboard()

  const handleClick = async () => {
    const successOnCopy = await copy(content)
    if (successOnCopy) {
      const toastTitle = (
        <div className='flex items-center gap-2'>
          <Copy className='h-4 w-4' />
          {title || 'Texto copiado com sucesso!'}
        </div>
      )

      toast({
        // @ts-ignore
        title: toastTitle,
      })
    }
  }

  return <div onClick={handleClick}>
    {children}
  </div>
}