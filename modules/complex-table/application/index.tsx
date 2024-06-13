'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComplexTableColumn, ComplexTableRow } from "../domain/types"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DivideCircleIcon, SettingsIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ComplexTableProps
  <TData, TColumn extends readonly ComplexTableColumn<TData>[]> {
  columns: TColumn
  data: TData[]
  searchableColumns?: TColumn[number]['id'][]
  caption?: string
}

function ComplexTable
  <TData extends ComplexTableRow, TColumn extends readonly ComplexTableColumn<TData>[]>
  ({ data, caption, columns: initialColumns, searchableColumns }: ComplexTableProps<TData, TColumn>) {

  const [columns, setColumns] = useState<TColumn[number][]>([...initialColumns])
  const [search, setSearch] = useState<string>('')
  const [stripedRows, setStripedRows] = useState<boolean>(true)

  const getColumnAlignment = (column: typeof initialColumns[number]) => {
    const styles = { left: 'text-left', right: 'text-right', center: 'text-center', default: '' }
    return styles[column.alignment || 'default']
  }

  const getRowStatus = (row: typeof data[number]) => {
    const styles = { primary: 'border-l-2 border-l-primary', secondary: 'border-l-2 border-l-secondary', default: '' }
    return styles[row.table?.rowStatus || 'default'] || ''
  }

  const getStrippedRows = () => {
    if (stripedRows) return 'even:bg-secondary'
    return ''
  }

  const filteredData = useMemo<typeof data>(() => {
    if (!searchableColumns) return data
    return data.filter(row => {
      let isMatch = false
      searchableColumns.forEach(columnId => {
        if (isMatch) return
        const columnObject = initialColumns.find(column => column.id === columnId)
        if (columnObject) {
          if (columnObject.render(row)?.toString().toLowerCase().includes(search.toLocaleLowerCase())) {
            isMatch = true
          }
        }
      })
      return isMatch
    })
  }, [data, searchableColumns, initialColumns, search])

  const visibleColumns = columns.filter(column => column.visible)

  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder="Pesquisar..."
            value={search}
            onValueChange={setSearch}
          />
        </div>
        <div className='flex items-center gap-2'>
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
                  <TableConfiguration stripedRows={stripedRows} setStripedRows={setStripedRows} />
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
        </div>
      </div>
      <Table>
        {
          caption && <TableCaption>{caption}</TableCaption>
        }
        <div className='w-full flex'>
          <ScrollArea orientation="horizontal" className='w-1 flex-1'>
            <TableHeader>
              <TableRow>
                {
                  visibleColumns.map(column => (
                    <TableHead key={column.id} className={cn(getColumnAlignment(column))}>
                      {column.label}
                    </TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className={cn(getRowStatus(row), getStrippedRows())}>
                    {
                      visibleColumns.map(column => (
                        <TableCell key={rowIndex + '-' + column.id} className={cn(getColumnAlignment(column))}>
                          {
                            column.render(row)
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </ScrollArea>
        </div>
      </Table>
    </div>
  )
}

interface TableConfigurationProps {
  stripedRows: boolean
  setStripedRows: (e: boolean) => void
}

function TableConfiguration({ setStripedRows, stripedRows }: TableConfigurationProps) {
  return (
    <div className='space-y-4'>
      <Label className='text-xl'>Geral</Label>
      <div className='flex flex-col gap-2 [&>div]:flex [&>div]:items-center [&>div]:gap-2'>
        <div>
          <Checkbox name='stripedRows' id='stripedRows' checked={stripedRows} onClick={() => setStripedRows(!stripedRows)} />
          <Label htmlFor='stripedRows'>
            Alternar linhas
          </Label>
        </div>
      </div>
    </div>
  )
}

interface ColumnConfiguratorProps
  <TData, TColumn extends readonly ComplexTableColumn<TData>[]> {
  data: TData[]
  columns: TColumn[number][]
  setColumns: (e: TColumn[number][]) => void
}

function ColumnConfigurator<TData extends ComplexTableRow, TColumn extends readonly ComplexTableColumn<TData>[]>
  ({ columns, setColumns }: ColumnConfiguratorProps<TData, TColumn>) {

  const handleClick = (column: TColumn[number]) => {
    const newColumns = [...columns]
    newColumns.forEach(currentColumn => {
      if (currentColumn.id === column.id) {
        currentColumn.visible = !currentColumn.visible
      }
    })
    setColumns(newColumns)
  }

  return (
    <div className='space-y-4'>
      <Label className='text-xl'>Colunas</Label>
      <div className='flex flex-col gap-2'>
        {
          columns.map(column => (
            <div key={column.id} className='w-full flex items-center justify-between'>
              <Label className='text-sm'>
                {column.label}
              </Label>
              <Switch checked={column.visible} onClick={() => handleClick(column)} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export {
  ComplexTable
}