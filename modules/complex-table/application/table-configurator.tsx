import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface TableConfigurationProps {
  stripedRows: boolean
  setStripedRows: (e: boolean) => void
}

export function TableConfigurator({ stripedRows, setStripedRows }: TableConfigurationProps) {
  return (
    <div className='space-y-4'>
      <Label className='text-xl'>Geral</Label>
      <div className='flex flex-col gap-2 [&>div]:flex [&>div]:items-center [&>div]:gap-2'>
        <div>
          <Checkbox name='stripedRows' id='stripedRows' checked={stripedRows} onClick={() => setStripedRows(!stripedRows)} />
          <Label htmlFor='stripedRows' className='text-sm'>
            Alternar linhas
          </Label>
        </div>
      </div>
    </div>
  )
}