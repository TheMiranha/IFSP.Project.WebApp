import { ReactNode } from "react"

type HorizontalSides = 'left' | 'center' | 'right'

export type ComplexTableColumn<TData> = {
  id: string
  label: string
  alignment?: HorizontalSides
  render: (e: TData) => ReactNode
  visible: boolean
  disableColumnConfiguration?: boolean
}

export type ComplexTableHeaderAction = {
  id: string
  label: ReactNode
  fn: () => void
  icon?: ReactNode
}

type RowStatus = 'primary' | 'default' | 'secondary'

export interface ComplexTableRow {
  table?: {
    rowStatus?: RowStatus
  }
}

export type WithComplexTableRow<T> = ComplexTableRow & T