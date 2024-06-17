'use client'

import { Button } from "@/components/ui/button"
import { SettingsIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ComplexTableColumn, ComplexTableRow } from "../domain/types"
import { Reorder } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { TableConfigurator } from "./table-configurator"
import { ColumnConfigurator } from "./column-configurator"

interface ComplexTableSettingsModalProps<TData, TColumn extends readonly ComplexTableColumn<TData>[]> {
  data: TData[]
  columns: TColumn[number][]
  stripedRows: boolean
  setStripedRows: (e: boolean) => void
  setColumns: (e: TColumn[number][]) => void
}

export function ComplexTableSettingsModal<TData extends ComplexTableRow, TColumn extends readonly ComplexTableColumn<TData>[]>({ data, columns, setColumns, stripedRows, setStripedRows }: ComplexTableSettingsModalProps<TData, TColumn>) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size='sm' variant='secondary'>
          <SettingsIcon className='size-4' />
          <span className='hidden md:block'>Configurações</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Preferências
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='w-full flex'>
          <div className='flex-1 p-2'>
            <TableConfigurator stripedRows={stripedRows} setStripedRows={setStripedRows} />
          </div>
          <Separator orientation="vertical" />
          <div className='flex-1 p-2'>
            <ColumnConfigurator data={data} columns={columns} setColumns={setColumns} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant='secondary'>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}