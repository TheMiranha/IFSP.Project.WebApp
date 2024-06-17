'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComplexTableColumn, ComplexTableHeaderAction, ComplexTableRow } from "../domain/types"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SettingsIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Reorder } from 'framer-motion'
import { ComplexTableSettingsModal } from "./settings-modal"

interface ComplexTableProps
  <TData, TColumn extends readonly ComplexTableColumn<TData>[]> {
  columns: TColumn
  data: TData[]
  searchableColumns?: TColumn[number]['id'][]
  caption?: string
  headerActions?: ComplexTableHeaderAction[]
}

function ComplexTable
  <TData extends ComplexTableRow, TColumn extends readonly ComplexTableColumn<TData>[]>
  ({ data, caption, columns: initialColumns, searchableColumns, headerActions }: ComplexTableProps<TData, TColumn>) {

  const [columns, setColumns] = useState<TColumn[number][]>([...initialColumns])
  const [search, setSearch] = useState<string>('')
  const [stripedRows, setStripedRows] = useState<boolean>(false)

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
          {
            headerActions?.map(action => (
              <Button key={action.id} variant='default' size='sm' onClick={action.fn}>
                {
                  action.icon
                }
                <span className='hidden md:block'>
                  {
                    action.label
                  }
                </span>
              </Button>
            ))
          }
        </div>
        <div className='flex items-center gap-2'>
          <ComplexTableSettingsModal data={data} columns={columns} setColumns={setColumns} stripedRows={stripedRows} setStripedRows={setStripedRows} />
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


export {
  ComplexTable
}