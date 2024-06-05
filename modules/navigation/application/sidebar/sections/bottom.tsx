import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { useAuth, useUser } from "@/modules/auth/application/hooks/useAuth"
import { getNameByAuthUser } from "@/modules/user/application/utils"
import { ChevronsUpDown } from "lucide-react"

export function SidebarBottomSection() {

  const { user } = useUser()

  return (
    <div className='flex items-center gap-2 px-4 h-12 w-[225px] border-t'>
      <Avatar className='rounded-md size-8'>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>{getNameByAuthUser(user).charAt(0)}</AvatarFallback>
      </Avatar>
      <div className='flex-1 flex flex-col truncate text-sm'>
        <Label className='truncate'>
          {getNameByAuthUser(user)}
        </Label>
        <Label className='text-[12px] text-muted-foreground truncate'>
          {user?.primaryEmailAddress?.emailAddress}
        </Label>
      </div>
      <ChevronsUpDown className='size-4 text-muted-foreground' />
    </div>
  )
}