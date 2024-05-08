import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export function TopbarLeft() {
  return (
    <div className='flex-1 flex items-center'>
      <Select>
        <SelectTrigger className='w-[250px]'>Matemática discreta</SelectTrigger>
        <SelectContent>
          <SelectItem value='MATD'>Matemática discreta</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}