'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchAll } from "@/modules/search/application/store/search-all";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigation } from "../store/navigation.store";
import { SearchIcon, SearchSlashIcon } from "lucide-react";

export function TopbarLeft() {

  const { setOpen } = useSearchAll()
  const { setOpenSheet } = useNavigation()

  const handleSearchClick = () => {
    setOpen(true)
  }

  return (
    <div className='flex-1 flex items-center gap-2'>
      <Button className='block md:hidden' variant='outline' onClick={() => setOpenSheet(true)}>
        <HamburgerMenuIcon className='size-4' />
      </Button>
      <Input
        placeholder="Pesquise qualquer coisa..."
        className="w-fit px-6 cursor-pointer flex-1"
        onClick={e => {
          e.preventDefault()
          handleSearchClick()
        }}
      />
    </div>
  )
}
