'use client'

import { Input } from "@/components/ui/input";
import { useSearchAll } from "@/modules/search/application/store/search-all";

export function TopbarCenter() {

  const { setOpen } = useSearchAll()

  const handleSearchClick = () => {
    setOpen(true)
  }

  return (
    <div className='flex-1 flex items-center justify-center'>
      <Input
        placeholder="Pesquise qualquer coisa..."
        className="w-fit px-6 cursor-pointer"
        onClick={e => {
          e.preventDefault()
          handleSearchClick()
        }}
      />
    </div>
  )
}