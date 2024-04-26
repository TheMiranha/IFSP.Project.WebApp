import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

export function TopbarRight() {
  return (
    <div className='flex-1 flex items-center justify-end'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp className='size-6' />
          </TooltipTrigger>
          <TooltipContent>
            Ajuda
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}