import { Label } from "@/components/ui/label"
import { ComplexTableColumn, ComplexTableRow } from "../domain/types"
import { Reorder, useDragControls, useMotionValue } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { GripIcon } from "lucide-react"
import { useRef } from "react"

interface ColumnConfiguratorProps
  <TData, TColumn extends readonly ComplexTableColumn<TData>[]> {
  data: TData[]
  columns: TColumn[number][]
  setColumns: (e: TColumn[number][]) => void
}

export function ColumnConfigurator<TData extends ComplexTableRow, TColumn extends readonly ComplexTableColumn<TData>[]>
  ({ data, columns, setColumns }: ColumnConfiguratorProps<TData, TColumn>) {

  const groupRef = useRef(null)

  const toggleColumn = (column: TColumn[number]) => {
    const newColumns = [...columns]
    newColumns.forEach(currentColumn => {
      if (currentColumn.id === column.id) {
        currentColumn.visible = !currentColumn.visible
      }
    })
    setColumns(newColumns)
  }

  return (
    <div className='space-y-4' ref={groupRef}>
      <Label className='text-xl'>Colunas</Label>
      <Reorder.Group axis='y' values={columns} onReorder={setColumns} dragConstraints={groupRef} className='flex flex-col gap-2'>
        {
          columns.map(column => (
            <DraggableItem data={data} column={column} key={column.id} toggleColumn={toggleColumn} />
          ))
        }
      </Reorder.Group>
    </div>
  )
}

interface DraggableItemProps<TData, TColumn extends readonly ComplexTableColumn<TData>[]> {
  data: TData[]
  column: TColumn[number]
  toggleColumn: (e: TColumn[number]) => void
}

function DraggableItem<TData extends ComplexTableRow, TColumn extends readonly ComplexTableColumn<TData>[]>({ column, toggleColumn }: DraggableItemProps<TData, TColumn>) {

  const dragControls = useDragControls()
  const y = useMotionValue(0)
  if (column.disableColumnConfiguration) return false
  return (
    <Reorder.Item style={{ y }} value={column} id={column.id} className='w-full flex items-center justify-between' dragListener={false} dragControls={dragControls}>
      <div className='flex items-center gap-2'>
        <div className='' onPointerDown={e => {
          dragControls.start(e);
          e.preventDefault()
        }}>
          <GripIcon className='size-4 text-muted-foreground' />
        </div>
        <span className='text-sm'>
          {column.label}
        </span>
      </div>
      <Switch checked={column.visible} onClick={() => toggleColumn(column)} />
    </Reorder.Item>
  )
}